const { Kafka } = require("kafkajs");

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
    eachMessage: async ({ topic, partition, message }) => {
      const data = message.value.toString();

      console.log("Received Notification:", data);

      // later we will send via WebSocket
    },
  });
};

module.exports = {
  connectConsumer,
};
