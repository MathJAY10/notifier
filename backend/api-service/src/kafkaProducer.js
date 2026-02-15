const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "api-service",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

const connectProducer = async () => {
  await producer.connect();
  console.log("Kafka Producer Connected");
};

const sendNotification = async (message) => {
  await producer.send({
    topic: "notifications",
    messages: [{ value: JSON.stringify(message) }],
  });
};

module.exports = { connectProducer, sendNotification };
