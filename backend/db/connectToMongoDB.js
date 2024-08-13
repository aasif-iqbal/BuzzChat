import mongoose from 'mongoose';

const connectToMongoDB = async () => {
  try {
        const MONGO_DB_URI = 'mongodb://localhost:27017/BuzzChatDB'
        // await mongoose.connect(process.env.MONGO_DB_URI);
        await mongoose.connect(MONGO_DB_URI);
  } catch (error) {
      console.log("Error connecting to MongoDB", error.message);
  }
}

export default connectToMongoDB;