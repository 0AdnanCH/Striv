import mongoose from 'mongoose';

const connectDB = async (mongoURI: string) => {
    try {
      await mongoose.connect(mongoURI);
      console.log('MongoDB Connected');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      process.exit(1);
    }
  };
export default connectDB;