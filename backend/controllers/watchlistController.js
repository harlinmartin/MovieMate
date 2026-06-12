import WatchlistItem from "../models/WatchlistItem.js";

// @desc    Get user's watchlist
// @route   GET /api/watchlist
// @access  Private
export const getWatchlist = async (req, res, next) => {
  try {
    const watchlist = await WatchlistItem.find({ user: req.user._id }).sort({
      addedAt: -1,
    });

    res.status(200).json({
      success: true,
      count: watchlist.length,
      watchlist,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add item to watchlist
// @route   POST /api/watchlist
// @access  Private
export const addToWatchlist = async (req, res, next) => {
  try {
    const { tmdbId, mediaType, title, posterPath, voteAverage, releaseDate } =
      req.body;

    // Validate required fields
    if (!tmdbId || !mediaType || !title) {
      return res.status(400).json({
        success: false,
        message: "tmdbId, mediaType, and title are required",
      });
    }

    // Check if already in watchlist
    const existing = await WatchlistItem.findOne({
      user: req.user._id,
      tmdbId,
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "This item is already in your watchlist",
      });
    }

    const item = await WatchlistItem.create({
      user: req.user._id,
      tmdbId,
      mediaType,
      title,
      posterPath,
      voteAverage,
      releaseDate,
    });

    res.status(201).json({
      success: true,
      message: "Added to watchlist",
      item,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove item from watchlist
// @route   DELETE /api/watchlist/:tmdbId
// @access  Private
export const removeFromWatchlist = async (req, res, next) => {
  try {
    const item = await WatchlistItem.findOneAndDelete({
      user: req.user._id,
      tmdbId: req.params.tmdbId,
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found in watchlist",
      });
    }

    res.status(200).json({
      success: true,
      message: "Removed from watchlist",
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Check if item is in watchlist
// @route   GET /api/watchlist/check/:tmdbId
// @access  Private
export const checkWatchlist = async (req, res, next) => {
  try {
    const item = await WatchlistItem.findOne({
      user: req.user._id,
      tmdbId: req.params.tmdbId,
    });

    res.status(200).json({
      success: true,
      isInWatchlist: !!item,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Search within user's watchlist
// @route   GET /api/watchlist/search?q=term
// @access  Private
export const searchWatchlist = async (req, res, next) => {
  try {
    const query = req.query.q;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Search query (q) is required",
      });
    }

    const results = await WatchlistItem.find({
      user: req.user._id,
      title: { $regex: query, $options: "i" },
    }).sort({ addedAt: -1 });

    res.status(200).json({
      success: true,
      count: results.length,
      watchlist: results,
    });
  } catch (error) {
    next(error);
  }
};
