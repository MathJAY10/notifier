const express = require("express");
const cors = require("cors");

const { connectConsumer } = require("./kafkaConsumer");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Notification Service Running");
});

const startServer = async () => {
  await connectConsumer();

  app.listen(5001, () => {
    console.log("Notification Service running on port 5001");
  });
};

startServer();
