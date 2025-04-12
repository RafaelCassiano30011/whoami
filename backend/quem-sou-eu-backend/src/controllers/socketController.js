import { createPlayer } from "../models/playerModel.js";
import { RoomService } from "../services/roomService.js";

export function handleCreateRoom(socket, { userId, name }) {
  const roomId = RoomService.createRoom(createPlayer(userId, name));
  socket.join(roomId);
  socket.emit("salaCriada", roomId);
  console.log(`Room ${roomId} created by ${name}`);
}

export function handleJoinRoom(socket, { roomId, userId, name }) {
  const result = RoomService.joinRoom(roomId, createPlayer(userId, name));

  if (result.error) {
    socket.emit("error", { message: result.error });
    return;
  }

  socket.join(roomId);
  socket.emit("entrouNaSala", { roomId, players: result.players });
  socket.to(roomId).emit("novoJogador", result.newPlayer);
  console.log(`${name} entrou na sala ${roomId}`);
}

export function handleLeaveRoom(socket, { roomId, userId }) {
  const wasRoomDeleted = RoomService.leaveRoom(roomId, userId);

  socket.leave(roomId);
  socket.to(roomId).emit("playerLeft", { userId });

  console.log(`${userId} saiu da sala ${roomId}`);
  if (wasRoomDeleted) {
    console.log(`Room ${roomId} deleted`);
  }
}