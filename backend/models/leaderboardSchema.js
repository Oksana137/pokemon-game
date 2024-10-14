import mongoose from 'mongoose';

const leaderboardSchema = new mongoose.Schema({
  // _id ist automatisch
  username: {
    type: String,
    required: [true, 'Username is required'], // ein Weg der Bodyvalidation 
    unique: true,
    trim: true,
  },
  score: { type: Number,
  required: [true, 'Username is required'],
   },
  date: {
    type: Date,          
    default: Date.now,   
    set: (value) => {
      // Datum beim Speichern im Format TT.MM.JJJJ Format speichern
      const date = new Date(value);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Monate mit Index ab 0, deshalb +1
      const year = date.getFullYear();
      return `${day}.${month}.${year}`;
    }
  }
});

export default mongoose.model('Leaderboard', leaderboardSchema);
