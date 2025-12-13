import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";

dotenv.config();

connectDB();

const app = express();

app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:5173", "https://brandturn.co.in", "https://www.brandturn.co.in", process.env.FRONTEND_URL].filter(Boolean) as string[],
  credentials: true,
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
