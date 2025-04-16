import { Server as ServerIO } from "socket.io";
import type { Server } from "http";
import { createRoom } from "../controllers/createRoom";
import { joinRoom } from "../controllers/joinRoom";
import { leaveRoom } from "../controllers/leaveRoom";

function setupWebSocket(server: Server) {
  const io = new ServerIO(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    socket.emit("id", socket.id);

    socket.on("createRoom", (data) => createRoom(socket, data));
    socket.on("joinRoom", (data) => joinRoom(socket, data));
    socket.on("leaveRoom", (data) => leaveRoom(socket, data));

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
