import mongoose from "mongoose"; // used for connection with MongoDB

/**
 * Connect to MongoDB with retry/backoff and sensible options.
 * Throws when connection ultimately fails so callers can decide how to proceed.
 */
const connectDB = async ({ retries = 5, backoff = 2000 } = {}) => {
    const uri = process.env.MONGODB_URL;
    if (!uri) {
        const err = new Error("MONGODB_URL environment variable is not set");
        console.error(err);
        throw err;
    }

    const options = {
        // These are recommended options for modern mongoose versions
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // how long to try selecting a server before erroring (ms)
        serverSelectionTimeoutMS: 15000,
        // socket timeout
        socketTimeoutMS: 45000,
    };

    let attempt = 0;
    while (attempt < retries) {
        try {
            attempt += 1;
            console.log(`MongoDB: attempt ${attempt} to connect to ${uri}`);
            await mongoose.connect(uri, options);
            console.log("Database Connected");

            // attach helpful listeners
            mongoose.connection.on("error", (err) => {
                console.error("Mongoose connection error:", err);
            });
            mongoose.connection.on("disconnected", () => {
                console.warn("Mongoose disconnected from MongoDB");
            });

            return mongoose;
        } catch (err) {
            console.error(`MongoDB connection attempt ${attempt} failed:`, err && err.message ? err.message : err);
            if (attempt >= retries) {
                console.error("MongoDB: All connection attempts failed");
                // rethrow so caller can decide to exit or retry at a higher level
                throw err;
            }
            // wait with exponential backoff before retrying
            const delay = backoff * attempt;
            console.log(`MongoDB: retrying in ${delay}ms...`);
            await new Promise((resolve) => setTimeout(resolve, delay));
        }
    }
};

export default connectDB;