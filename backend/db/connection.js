import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Hier wird Variable für .env definiert
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    console.log("Mongo URI: ", process.env.MONGO_URI);
    console.log(connection.connection.db.databaseName);
  } catch (error) {
    console.log('Connection error:', error.stack);
    process.exit(1);
  }
};

connectDB();
