import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user-route.js";
import { connectDB } from "./db/dbConnection.js";
import adminRoutes from "./routes/admin-route.js";
import authorizedRoutes from "./routes/authorized-user.js";
import guestRoutes from "./routes/guest.routes.js";
import { fileURLToPath } from "url";
import path from "path";

import cors from "cors";
import chatRoutes from "./routes/chat-route.js";

const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: "*",  // Allow all origins or use your allowed domains
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],  // Ensure OPTIONS is allowed
    allowedHeaders: ["Content-Type", "Authorization"],  // List your headers
    credentials: true,  // If using cookies or sessions
  })
);


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from uploads directory
app.use("/uploads", express.static(path.resolve(__dirname, "../uploads")));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/blog", authorizedRoutes);
app.use("/api/guest", guestRoutes);
app.use("/api/v1", chatRoutes);

// Default route
app.get("/api", (req, res) => {
  res.send("Hello, World!");
});

// Set the port
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
