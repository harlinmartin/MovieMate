import express from "express";
import {
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist,
  checkWatchlist,
  searchWatchlist,
} from "../controllers/watchlistController.js";
import protect from "../middleware/auth.js";

const router = express.Router();

// All watchlist routes are protected
router.use(protect);

// GET /api/watchlist/search?q=term (must be before /:tmdbId)
router.get("/search", searchWatchlist);

// GET /api/watchlist/check/:tmdbId
router.get("/check/:tmdbId", checkWatchlist);

// GET /api/watchlist
router.get("/", getWatchlist);

// POST /api/watchlist
router.post("/", addToWatchlist);

// DELETE /api/watchlist/:tmdbId
router.delete("/:tmdbId", removeFromWatchlist);

export default router;
