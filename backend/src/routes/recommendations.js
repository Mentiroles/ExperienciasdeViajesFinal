import crypto from "node:crypto";
import express from "express";
import fs from "fs/promises";
import path from "path";
import fileUpload from "express-fileupload";
import { loggedInGuard } from "../middlewares/logged-in-guard.js";
import { authMiddleware } from "../middlewares/auth.js";
import { PHOTOS_DIR, SERVER_HOST } from "../../constants.js";
import { wrapWithCatch } from "../utils/wrap-with-catch.js";
import { sendOK, sendOKCreated } from "../utils/response.js";
import { db } from "../database/db-connection.js";
import {
  validateCreateRecommendationPayload,
  validateAddImagePayload,
  validateEditRecommendationPayload,
  validateDeleteRecommendationPayload,
} from "../validations/reco-validations.js";
import {
  throwExistingLikeError,
  throwLikeNotFoundError,
} from "../utils/errors.js";

const router = express.Router();

// ! GET RECOMENDACIONES POR CATEGORIA, UBICACIÓN, ID O TODAS ORDENADAS POR LIKES

const PAGE_SIZE = 20;

router.get(
  "/recommendations",
  wrapWithCatch(async (req, res) => {
    const userId = req.currentUser?.id;
    const page = Number(req.query.page) || 1;
    const offset = PAGE_SIZE * (page - 1);
    const location = req.query.location;
    const category = req.query.category;
    const recommendationId = req.query.recommendationId;

    let query = `
    SELECT
    recommendations.id, title, category, locationId, recommendations.userId, description, lean_in, created_at,
    COUNT(recommendationLikes.id) as likeCount
    FROM recommendations
    LEFT JOIN locations ON recommendations.locationId = locations.id
    LEFT JOIN recommendationLikes ON recommendations.id = recommendationLikes.recommendationId
    `;

    let params = [];

    if (location && category) {
      query += `
      WHERE locations.country = ? AND category = ?
      `;
      params = [location, category];
    } else if (location) {
      query += `
      WHERE locations.country = ?
      `;
      params = [location];
    } else if (category) {
      query += `
      WHERE category = ?
      `;
      params = [category];
    } else if (recommendationId) {
      query += `
      WHERE recommendations.id = ?
      `;
      params = [recommendationId];
    }

    query += `
    GROUP BY recommendations.id
    ORDER BY likeCount DESC
    `;

    query += `
    LIMIT ${PAGE_SIZE}
    OFFSET ${offset}
    `;

    const [recommendations] = await db.execute(query, params);

    const [[recommendationCount]] = await db.execute(`
    SELECT COUNT(*) AS count FROM recommendations
    `);

    const totalPages = Math.ceil(recommendationCount.count / PAGE_SIZE);

    const finalRecommendations = await Promise.all(
      recommendations.map(async (recommendation) => {
        const [[location]] = await db.execute(
          `SELECT id, country as name FROM locations WHERE id = ? LIMIT 1`,
          [recommendation.locationId]
        );
        const [[user]] = await db.execute(
          `SELECT id, nickName, photo FROM users WHERE id = ? LIMIT 1`,
          [recommendation.userId]
        );
        const [photoRows] = await db.execute(
          `SELECT url FROM recommendationPhotos WHERE recommendationId = ?`,
          [recommendation.id]
        );

        const photo = photoRows.map((row) => row.url);

        const [[likeCount]] = await db.execute(
          `SELECT COUNT(*) as count FROM recommendationLikes WHERE recommendationId = ?`,
          [recommendation.id]
        );

        let isLikedByCurrentUser = false;

        if (userId) {
          const [[like]] = await db.execute(
            `SELECT * FROM recommendationLikes WHERE userId = ? AND recommendationId = ? LIMIT 1
                    `,
            [userId, recommendation.id]
          );
          isLikedByCurrentUser = !!like;
        }

        const [[comments]] = await db.execute(
          `SELECT * FROM comments WHERE recommendationId = ?`,
          [recommendation.id]
        );

        return {
          ...recommendation,
          likeCount: likeCount.count,
          location,
          user,
          photo,
          comments,
          isLikedByCurrentUser,
        };
      })
    );

    sendOK(res, {
      totalPages,
      recommendations: finalRecommendations,
    });
  })
);

router.use(authMiddleware);
router.use(loggedInGuard);

// ! CREAR RECOMENDACIONES

router.post(
  "/recommendations",
  wrapWithCatch(async (req, res) => {
    console.log(req.body);
    const { title, category, locationId, description, lean_in } =
      await validateCreateRecommendationPayload(req.body);

    const userId = req.currentUser.id;

    //? LA CATEGORIA DEBERA SELECCIONARSE, NO PUEDE PONER UNA NUEVA

    const [{ insertId }] = await db.execute(
      `INSERT INTO recommendations(title, category, locationId, userId, description,lean_in) VALUES(?,?,?,?,?,?)`,
      [title, category, locationId, userId, description, lean_in]
    );

    sendOKCreated(res, insertId);
  })
);

// ! EDITAR RECOMENDACIONES

router.patch(
  "/recommendations/:recommendationId",
  wrapWithCatch(async (req, res) => {
    const recommendationId = req.params.recommendationId;
    const { title, category, locationId, description } =
      await validateEditRecommendationPayload({
        ...req.body,
        recommendationId: recommendationId,
        userId: req.currentUser.id,
      });

    await db.execute(
      `UPDATE recommendations SET title = ?, category = ?, locationId = ?,  description = ? WHERE id = ?`,
      [title, category, locationId, description, recommendationId]
    );

    sendOK(res);
  })
);

// ! AGREGAR IMAGENES A RECOMENDACIONES

const fileParser = fileUpload();
router.post(
  "/recommendations/:recommendationId/image",
  fileParser,
  wrapWithCatch(async (req, res) => {
    const { image, recommendationId } = await validateAddImagePayload({
      image: req.files?.image,
      recommendationId: req.params.recommendationId,
      userId: req.currentUser.id,
    });

    await fs.mkdir(PHOTOS_DIR, { recursive: true });

    const fileExtension = path.extname(image.name);

    const randomFileName = crypto.randomUUID();

    const newFilePath = `${randomFileName}${fileExtension}`;

    await image.mv(path.join(PHOTOS_DIR, newFilePath));

    const URL = `photos/${newFilePath}`;

    const [{ insertImage }] = await db.execute(
      `INSERT INTO recommendationPhotos (recommendationId, url)
    VALUES(?,?)`,
      [recommendationId, URL]
    );

    sendOKCreated(res, insertImage);
  })
);

// ! DELETE RECOMENDACIONES

router.delete(
  "/recommendations/:recommendationId",
  wrapWithCatch(async (req, res) => {
    const { recommendationId } = await validateDeleteRecommendationPayload({
      recommendationId: req.params.recommendationId,
      userId: req.currentUser.id,
    });

    const [photos] = await db.execute(
      `SELECT * FROM recommendationPhotos WHERE recommendationId = ?`,
      [recommendationId]
    );

    const deletePhotosPromises = photos.map(async (photo) => {
      await fs.unlink(path.join(PHOTOS_DIR, path.basename(photo.url)));
    });
    await Promise.all(deletePhotosPromises);

    await db.execute(
      `DELETE FROM recommendationPhotos WHERE recommendationId = ?`,
      [recommendationId]
    );

    await db.execute(`DELETE FROM recommendations WHERE id = ?`, [
      recommendationId,
    ]);

    sendOK(res);
  })
);

// ! POST y DELETE  likes en recomendaciones

router.post(
  "/recommendations/:recommendationId/like",
  loggedInGuard,
  wrapWithCatch(async (req, res) => {
    const { recommendationId } = req.params;
    const currentUserId = req.currentUser.id;

    const [[existingLike]] = await db.execute(
      `SELECT * FROM recommendationLikes WHERE userId = ? AND recommendationId = ? LIMIT 1`,
      [currentUserId, recommendationId]
    );

    if (existingLike) {
      throwExistingLikeError();
    }

    // Insertar el nuevo like en la tabla
    await db.execute(
      `INSERT INTO recommendationLikes (userId, recommendationId) VALUES(?,?)`,
      [currentUserId, recommendationId]
    );

    sendOKCreated(res);
  })
);

router.delete(
  "/recommendations/:recommendationId/like",
  wrapWithCatch(async (req, res) => {
    const { recommendationId } = req.params;
    const userId = req.currentUser.id;

    const result = await db.execute(
      `DELETE FROM recommendationLikes WHERE userId = ? AND recommendationId = ?`,
      [userId, recommendationId]
    );

    if (result[0].affectedRows > 0) {
      sendOK(res, { message: "Like deleted successfully" });
    } else {
      throwLikeNotFoundError();
    }
  })
);
export default router;
