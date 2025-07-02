import { Socket } from "socket.io";
import { createPlayer } from "../models/playerModel";
import { RoomService } from "../services/roomService";
import { z } from "zod";

export async function joinRoom(socket: Socket, data: { roomId: string; userId: string; name: string }) {
  const joinRoomSchema = z.object({
    roomId: z.string(),
    userId: z.string(),
    name: z.string(),
  });

  const { roomId, userId, name } = joinRoomSchema.parse(data);

  const result = RoomService.joinRoom(roomId, createPlayer({ userId, name }));

  if (result.error) {
    socket.emit("error", { message: result.error });
    return;
  }

  socket.join(roomId);
  socket.emit("entrouNaSala", { roomId, players: result.players });

  socket.to(roomId).emit("novoJogador", {
    newPlayer: result.newPlayer,
    players: result.players,
  });
  console.log(`${name} id ${userId} entrou na sala ${roomId}`);
}
