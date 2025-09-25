import mongoose from "mongoose"; //used for connection with mongoDB

const connectDB=async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database Connected");
    } catch (error) {
        console.error(error);
    }
}

export default connectDB;