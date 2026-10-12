import express from 'express';
import authRoutes from "../routes/auth.routes.js"

const app = express();

// Global Middleware

app.use(express.json());

// Connection to Routes

app.use("/api/auth", authRoutes)

export default app;