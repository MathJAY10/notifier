const express = require("express");
const cors = require("cors");
const http = require("http");

const { connectConsumer } = require("./kafkaConsumer");
const { initSocket } = require("./socketServer");

const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const startServer = async () => {
  await connectConsumer();

  initSocket(server);

  server.listen(5001, () => {
    console.log("Notification Service running on port 5001");
  });
};

startServer();
