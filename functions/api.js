// Serverless function for Netlify
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import serverless from 'serverless-http';
import session from 'express-session';
import passport from '../config/passport.js';
import path from 'path';

// Utilities
import connectDB from '../config/db.js';
import categoryRoutes from '../routes/categoryRoutes.js';
import contactRoutes from '../routes/contactRoutes.js';
import newsletterRoutes from '../routes/newsletterRoutes.js';
import orderRoutes from '../routes/orderRoutes.js';
import productRoutes from '../routes/productRoutes.js';
import uploadRoutes from '../routes/uploadRoutes.js';
import userRoutes from '../routes/userRoutes.js';

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// CORS configuration - allow frontend domain
app.use(cors({
  origin: ['https://mern-e-commerce-store-frontend.windsurf.build', 'http://localhost:5174', 'http://localhost:5173'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Session configuration for OAuth
app.use(session({
  secret: process.env.SESSION_SECRET || 'nepto-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Initialize Passport and session
app.use(passport.initialize());
app.use(passport.session());

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'MERN E-Commerce API Server' });
});

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/newsletter", newsletterRoutes);

app.get("/api/config/paypal", (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID || 'sb' });
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Handle 404 for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ message: 'API endpoint not found' });
});

// Export the serverless function
export const handler = serverless(app);
