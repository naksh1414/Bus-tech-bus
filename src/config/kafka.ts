import { Kafka } from "kafkajs";
import dotenv from "dotenv";
import * as net from "net";
dotenv.config();

const kafka = new Kafka({
  clientId: "bus-service",
  brokers: [process.env.KAFKA_BROKER || "0.0.0.0:9092"],
});

export const kafkaProducer = kafka.producer();
export const kafkaConsumer = kafka.consumer({ groupId: "bus-service-group" });
