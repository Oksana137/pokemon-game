import mongoose from 'mongoose';

const leaderboardSchema = new mongoose.Schema({
  // _id ist automatisch
  username: {
    type: String,
    required: [true, 'Username is required'], // ein Weg der Bodyvalidation
    unique: true,
    trim: true,
  },
  score: { type: String },
  date: {
    type: String, // ANPASSEN fehlt noch
    // match:
  },
});

export default mongoose.model('Leaderboard', leaderboardSchema);
