import express from "express";
import { connectDatabase } from "./src/config/database";
import busRoutes from "./src/routes/bus.routes";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8008;

app.use(cors());
app.use(express.json());
app.use("/api", busRoutes);

app.use("/", (req, res) => {
  res.send("Bus Service is running");
});

async function startServer() {
  try {
    // Connect to MongoDB
    await connectDatabase();
    console.log("Connected to MongoDB successfully");

    // Start server
    app.listen(PORT, () => {
      console.log(`Bus Service running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start Bus Service:", error);
    process.exit(1);
  }
}

startServer();