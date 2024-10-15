import mongoose from 'mongoose';

const leaderboardSchema = new mongoose.Schema({
  // _id ist automatisch
  username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
  },
  score: {
      type: Number,
      required: [true, 'Score is required'],
  },
  date: {
      type: Date,
      required: [true, 'Date is required'],
      default: Date.now,
  }
});

export default mongoose.model('Leaderboard', leaderboardSchema);
