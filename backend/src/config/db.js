import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const NODE_ENV = process.env.NODE_ENV || 'development';

if (NODE_ENV !== 'production') {
  mongoose.set('debug', true);
}

const connectDB = async (URI) => {
  try {
    await mongoose.connect(URI, {});

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    // process.exit(1);
    setTimeout(() => {
      console.log('Trying to reconnect to MongoDB...');

      connectDB(URI);
    }, 5000);
  }
};

export { connectDB };
