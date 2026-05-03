import "reflect-metadata"; // Required for tsyringe
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { setupDI } from "./infrastructure/config/dependencyContainer";
import { getAuthRoutes } from "./presentation/routes/authRoutes";
import { getUrlRoutes } from "./presentation/routes/urlRoutes";
import { getRedirectRoutes } from "./presentation/routes/redirectRoutes";
import { API_ROUTES } from "./shared/constants/apiRoutes";
import { connectDB } from "./infrastructure/database/connection";
import { ErrorHandlerMiddleware } from "./presentation/middleware/errorHandler";

dotenv.config();

// Connect to Database
connectDB();

// Initialize Dependency Injection
setupDI();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use(API_ROUTES.AUTH.BASE, getAuthRoutes());
app.use(API_ROUTES.URL.BASE, getUrlRoutes());

// Mount wildcard redirect route LAST to avoid swallowing /api routes
app.use('/', getRedirectRoutes());

// Global Error Handler
app.use(ErrorHandlerMiddleware.handle);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});




