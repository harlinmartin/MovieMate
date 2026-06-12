import Rating from "../models/Rating.js";

// @desc    Get user's rating for a specific movie/show
// @route   GET /api/ratings/:tmdbId
// @access  Private
export const getRating = async (req, res, next) => {
  try {
    const rating = await Rating.findOne({
      user: req.user._id,
      tmdbId: req.params.tmdbId,
    });

    res.status(200).json({
      success: true,
      rating: rating ? rating.rating : null,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all ratings by user
// @route   GET /api/ratings
// @access  Private
export const getAllRatings = async (req, res, next) => {
  try {
    const ratings = await Rating.find({ user: req.user._id }).sort({
      updatedAt: -1,
    });

    res.status(200).json({
      success: true,
      count: ratings.length,
      ratings,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create or update a rating
// @route   PUT /api/ratings
// @access  Private
export const upsertRating = async (req, res, next) => {
  try {
    const { tmdbId, mediaType, rating } = req.body;

    // Validate
    if (!tmdbId || !mediaType || !rating) {
      return res.status(400).json({
        success: false,
        message: "tmdbId, mediaType, and rating are required",
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    // Upsert: create if doesn't exist, update if it does
    const result = await Rating.findOneAndUpdate(
      { user: req.user._id, tmdbId },
      {
        user: req.user._id,
        tmdbId,
        mediaType,
        rating,
        updatedAt: Date.now(),
      },
      { upsert: true, new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Rating saved",
      rating: result,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a rating
// @route   DELETE /api/ratings/:tmdbId
// @access  Private
export const deleteRating = async (req, res, next) => {
  try {
    const rating = await Rating.findOneAndDelete({
      user: req.user._id,
      tmdbId: req.params.tmdbId,
    });

    if (!rating) {
      return res.status(404).json({
        success: false,
        message: "Rating not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Rating removed",
    });
  } catch (error) {
    next(error);
  }
};
