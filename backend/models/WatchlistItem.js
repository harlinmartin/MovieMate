import mongoose from "mongoose";

const watchlistItemSchema = new mongoose.Schema({
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
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  posterPath: {
    type: String,
    default: null,
  },
  voteAverage: {
    type: Number,
    default: 0,
  },
  releaseDate: {
    type: String,
    default: null,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

// One user can only add the same movie once
watchlistItemSchema.index({ user: 1, tmdbId: 1 }, { unique: true });

const WatchlistItem = mongoose.model("WatchlistItem", watchlistItemSchema);

export default WatchlistItem;
