import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import corsOptions from "./configurations/corsOptions.js";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./controllers/errorController.js";
import AppError from "./utilities/appError.js";
import whatsAppRoutes from "./routes/whatsAppRoutes.js";


const __dirname = dirname(fileURLToPath(import.meta.url));

export const app = express();

app.use(cors(corsOptions));
app.use(cookieParser());

// Server static files
app.use("/uploads", express.static(join(__dirname, "uploads")));

// Body parser
app.use(express.json());

// Routes
app.use("/whatsapp", whatsAppRoutes);

// Undefined routes
app.all("/", (req, res, next) => {
  next(new AppError(`Can not find ${req.originalUrl} on this server.`, 404));
});

// Manage all errors
app.use(globalErrorHandler);
