import {
  throwTitleIsRequiredError,
  throwCategoryIsRequiredError,
  throwDescriptionIsRequiredError,
  throwImageIsRequiredError,
  throwRecommendationIdIsRequiredError,
  throwNotFoundError,
  throwUnauthorizedError,
  throwInvalidLocationError,
} from "../utils/errors.js";
import { db } from "../database/db-connection.js";
import joi from "joi";

export async function validateCreateRecommendationPayload(payload) {
  const title = payload.title && payload.title.trim();
  const category = payload.category && payload.category.trim();
  const country = payload.country;
  const description = validateDescription(payload.description);
  const lean_in = payload.lean_in;

  const existingRecommendation = await checkIfRecommendationExists(description);

  const schema = joi.object({
    title: joi.string().max(100).required(),
    category: joi.string().max(100).required(),
    country: joi.string().max(100).required(),
    description: joi.string().min(8).max(250).required(),
    lean_in: joi.string().max(50),
  });

  const { error } = schema.validate({
    title,
    category,
    description,
    country,
    lean_in,
  });

  if (error) {
    throw new Error(error.details[0].message);
  }

  if (!title) {
    throwTitleIsRequiredError();
  }

  if (!category) {
    throwCategoryIsRequiredError();
  }

  const locationId = await getLocationIdByCountry(country);

  return {
    title,
    category,
    locationId,
    description,
    existingRecommendation,
    lean_in,
  };
}

function validateDescription(description) {
  description = description.trim();

  if (!description) {
    throwDescriptionIsRequiredError();
  }
  return description;
}

async function checkIfRecommendationExists(description) {
  const [recommendations] = await db.execute(
    `SELECT * FROM recommendations WHERE description = ?`,
    [description]
  );
  if (recommendations.length > 0) {
    throw new Error("Recommendation already exists");
  }
}

export async function getLocationIdByCountry(country) {
  const [[location]] = await db.execute(
    `SELECT id FROM locations WHERE country = ? LIMIT 1`,
    [country]
  );

  if (!location) {
    throwInvalidLocationError();
  }

  return location.id;
}

export async function validateEditRecommendationPayload(payload) {
  const title = payload.title;
  const category = payload.category;
  const description = validateDescription(payload.description);
  const locationId = await getLocationIdByCountry(payload.locationId);

  const schema = joi.object({
    title: joi.string().max(100).required(),
    category: joi.string().max(100).required(),

    description: joi.string().min(8).max(250).required(),
    locationId: joi.number().required(),
  });

  const { error } = schema.validate({
    title,
    category,
    description,
    locationId,
  });

  if (error) {
    throw new Error(error.details[0].message);
  }

  const { recommendationId, userId } = await validateRecommendationAndUser(
    payload.recommendationId,
    payload.userId
  );

  return {
    title,
    category,
    locationId,
    description,
    recommendationId,
    userId,
  };
}

export async function validateAddImagePayload(payload) {
  const image = payload.image;

  if (!image) {
    throwImageIsRequiredError();
  }

  const { recommendationId, userId } = await validateRecommendationAndUser(
    payload.recommendationId,
    payload.userId
  );

  return {
    recommendationId,
    userId,
    image,
  };
}

export async function validateDeleteRecommendationPayload(payload) {
  const { recommendationId, userId } = await validateRecommendationAndUser(
    payload.recommendationId,
    payload.userId
  );

  return {
    recommendationId,
    userId,
  };
}

async function validateRecommendationAndUser(recommendationId, userId) {
  recommendationId = Number(recommendationId);
  if (!recommendationId) {
    throwRecommendationIdIsRequiredError();
  }

  const [[recommendation]] = await db.execute(
    `SELECT * FROM recommendations WHERE id = ? LIMIT 1`,
    [recommendationId]
  );

  if (!recommendation) {
    throwNotFoundError();
  }

  if (recommendation.userId != userId) {
    throwUnauthorizedError();
  }

  return {
    recommendationId,
    userId,
  };
}
