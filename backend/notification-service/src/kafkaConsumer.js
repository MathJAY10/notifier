const { Kafka } = require("kafkajs");
const { sendNotificationToFrontend } = require("./socketServer");

const kafka = new Kafka({
  clientId: "notification-service",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({
  groupId: "notification-group",
});

const connectConsumer = async () => {
  await consumer.connect();

  console.log("Kafka Consumer Connected");

  await consumer.subscribe({
    topic: "notifications",
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const data = message.value.toString();

      console.log("Received Notification:", data);

      sendNotificationToFrontend(data);
    },
  });
};

module.exports = {
  connectConsumer,
};
