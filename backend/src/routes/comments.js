import express from "express";
import { wrapWithCatch } from "../utils/wrap-with-catch.js";
import { sendError, sendOK, sendOKCreated } from "../utils/response.js";
import { db } from "../database/db-connection.js";
import { validateCreateCommentPayload } from "../validations/comment-validations.js";
import { loggedInGuard } from "../middlewares/logged-in-guard.js";
import { authMiddleware } from "../middlewares/auth.js";
import {
  throwUnauthorizedError,
  throwCommentNotFoundError,
} from "../utils/errors.js";

const router = express.Router();
router.use(authMiddleware);
router.use(loggedInGuard);

// ! CREAR COMENTARIOS

router.post(
  "/recommendations/:recommendationId/comentarios",
  loggedInGuard,
  wrapWithCatch(async (req, res) => {
    console.log(req.body);
    const { recommendationId, message } = await validateCreateCommentPayload({
      message: req.body.message,
      recommendationId: req.params.recommendationId,
    });

    const userId = req.currentUser.id;

    const [{ insertId }] = await db.execute(
      `INSERT INTO comments(message, recommendationId, userId) VALUES(?,?,?)`,
      [message, recommendationId, userId]
    );

    sendOKCreated(res, insertId);
  })
);

router.delete(
  "/recommendations/:recommendationId/comentarios/:commentId",
  loggedInGuard,
  wrapWithCatch(async (req, res) => {
    const recommendationId = req.params.recommendationId;
    const commentId = req.params.commentId;
    const currentUserId = req.currentUser.id;

    const [comment] = await db.execute(
      "SELECT * FROM comments WHERE  id = ? AND recommendationId = ?",
      [commentId, recommendationId]
    );

    if (!commentId) {
      throwCommentNotFoundError();
    }

    if (comment[0].userId !== currentUserId) {
      throwUnauthorizedError();
    }

    await db.execute("DELETE FROM comments WHERE id = ?", [commentId]);

    sendOK(res, { success: true });
  })
);

export default router;
