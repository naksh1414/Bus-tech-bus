import express from "express";
import { connectDatabase } from "./src/config/database";
import { kafkaProducer, kafkaConsumer } from "./src/config/kafka";
import busRoutes from "./src/routes/bus.routes";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use("/api", busRoutes);

async function startServer() {
  try {
    // Connect to MongoDB
    await connectDatabase();

    // Connect Kafka
    await kafkaProducer.connect();
    await kafkaConsumer.connect();

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
