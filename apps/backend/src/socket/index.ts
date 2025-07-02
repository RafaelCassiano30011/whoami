import { Server as ServerIO } from "socket.io";
import type { Server } from "http";
import { createRoom } from "../controllers/createRoom";
import { joinRoom } from "../controllers/joinRoom";
import { leaveRoom } from "../controllers/leaveRoom";
import { handleSubmitCharacter } from "../controllers/characterController";
import { startGame } from "../controllers/startGame";
import { players, rooms } from "../services/roomService";

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
    socket.on("refreshId", ({ oldId }) => {
      const roomId = players[oldId];
      if (rooms[roomId]) {
        rooms[roomId].players = rooms[roomId].players.map((player) => {
          if (player.userId === oldId) {
            return { ...player, userId: socket.id };
          }
          return player;
        });
        players[socket.id] = roomId;

        console.log(players);

        delete players[oldId];
        console.log(`ID atualizado de ${oldId} para ${socket.id}`);

        console.log(rooms[roomId].players, "players after update");
      }
    });

    socket.on("createRoom", (data) => createRoom(socket, data));
    socket.on("joinRoom", (data) => joinRoom(socket, data));
    socket.on("leaveRoom", (data) => leaveRoom(socket, data));
    socket.on("submitCharacter", (data) => handleSubmitCharacter({ socket, io }, data));

    socket.on("startGame", (data) => startGame(io, data));

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
