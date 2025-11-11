import express from 'express';
import dotenv from 'dotenv';    
import cors from "cors";
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

dotenv.config();
const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
// Build allowed origins list from environment or fall back to sensible defaults
const allowedOrigins = (process.env.ALLOWED_ORIGINS && process.env.ALLOWED_ORIGINS.split(",")) || [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    // Deployed domains (add or override via ALLOWED_ORIGINS env variable)
    "https://ai-powered-e-commerce-server.vercel.app",
    "https://ai-powered-e-commerce-client.vercel.app",
    "https://ai-powered-e-commerce-admin.vercel.app"
];

app.use(cors({
    origin: function(origin, callback){
        // allow requests with no origin (like server-to-server, mobile, or curl)
        if(!origin) return callback(null, true);
        if(allowedOrigins.indexOf(origin) !== -1){
            return callback(null, true);
        }
        return callback(new Error('CORS policy: origin not allowed'));
    },
    credentials: true
}));

// Root route
app.get("/", (req, res) => {
    res.json({ message: "Server is running successfully!" });
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);

const PORT = process.env.PORT || 8000;

// Start server only after DB is connected. If DB connection fails, exit with non-zero code
const start = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error("Failed to start server due to DB connection error:", err && err.message ? err.message : err);
        // give a short moment for logs to flush
        setTimeout(() => process.exit(1), 100);
    }
};

// Global process handlers for better debugging of crashes/unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception thrown:', err);
    // Exit — the process may be in an unknown state
    setTimeout(() => process.exit(1), 100);
});

start();