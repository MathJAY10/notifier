const express = require("express");
const cors = require("cors");

const { connectProducer, sendNotification } = require("./kafkaProducer");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/notify", async (req, res) => {
  try {
    const message = req.body;

    await sendNotification(message);

    res.json({
      success: true,
      message: "Notification sent to Kafka",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
    });
  }
});

const startServer = async () => {
  await connectProducer();

  app.listen(5000, () => {
    console.log("API Service running on port 5000");
  });
};

startServer();
