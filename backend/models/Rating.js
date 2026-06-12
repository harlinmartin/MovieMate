import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tmdbId: {
    type: Number,
    required: [true, "TMDB ID is required"],
  },
  mediaType: {
    type: String,
    enum: ["movie", "tv"],
    required: [true, "Media type is required"],
  },
  rating: {
    type: Number,
    required: [true, "Rating is required"],
    min: [1, "Rating must be at least 1"],
    max: [5, "Rating cannot exceed 5"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// One rating per user per movie
ratingSchema.index({ user: 1, tmdbId: 1 }, { unique: true });

// Update the updatedAt timestamp on every save
ratingSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Rating = mongoose.model("Rating", ratingSchema);

export default Rating;
