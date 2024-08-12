import moongoose from "moongoose";

const connectToMongoDB = async () => {
  try {
        const MONGO_DB_URI = 'mongodb://localhost:27017/BuzzChatDB'
        // await moongoose.connect(process.env.MONGO_DB_URI);
        await moongoose.connect(MONGO_DB_URI);
  } catch (error) {
      console.log("Error connecting to MongoDB", error.message);
  }
}

export default connectToMongoDB;