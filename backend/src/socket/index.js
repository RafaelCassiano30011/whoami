import { Server } from "socket.io";
import { handleCreateRoom, handleJoinRoom, handleLeaveRoom } from "../controllers/socketController.js";

function setupWebSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    socket.emit("id", socket.id);

    socket.on("createRoom", (data) => handleCreateRoom(socket, data));
    socket.on("joinRoom", (data) => handleJoinRoom(socket, data));
    socket.on("leaveRoom", (data) => handleLeaveRoom(socket, data));

    socket.on("disconnect", () => {
      console.log(`Player ${socket.id} desconectou-se`);
      
    });

    socket.on("message", (msg) => {
      console.log("Mensagem recebida:", msg);
      socket.send(`Recebido: ${msg}`);
    });
  });
}

export default setupWebSocket;
