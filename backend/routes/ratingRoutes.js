import express from "express";
import {
  getRating,
  getAllRatings,
  upsertRating,
  deleteRating,
} from "../controllers/ratingController.js";
import protect from "../middleware/auth.js";

const router = express.Router();

// All rating routes are protected
router.use(protect);

// GET /api/ratings
router.get("/", getAllRatings);

// GET /api/ratings/:tmdbId
router.get("/:tmdbId", getRating);

// PUT /api/ratings (create or update)
router.put("/", upsertRating);

// DELETE /api/ratings/:tmdbId
router.delete("/:tmdbId", deleteRating);

export default router;
