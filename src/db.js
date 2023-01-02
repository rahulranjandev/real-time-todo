import mongoose from 'mongoose';

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
