const { Server } = require("socket.io");

let io;

const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("Frontend connected:", socket.id);
  });
};

const sendNotificationToFrontend = (message) => {
  if (io) {
    io.emit("notification", message);
  }
};

module.exports = {
  initSocket,
  sendNotificationToFrontend,
};
