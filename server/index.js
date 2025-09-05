import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import journalRoutes from "./routes/journal.routes.js";
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/journals", journalRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
