import "reflect-metadata"; // Required for tsyringe
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { setupDI } from "./infrastructure/config/dependencyContainer";
import { getAuthRoutes } from "./presentation/routes/authRoutes";
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
app.use(cors());
app.use(express.json());

// Routes
app.use(API_ROUTES.AUTH.BASE, getAuthRoutes());

// Global Error Handler
app.use(ErrorHandlerMiddleware.handle);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
