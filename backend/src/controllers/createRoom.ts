import { Socket } from "socket.io";
import { Player, RoomService } from "../services/roomService";
import { createPlayer } from "../models/playerModel";
import { z } from "zod";

export function createRoom(socket: Socket, data: Omit<Player, "status">) {
  const createRoomSchema = z.object({
    userId: z.string(),
    name: z.string(),
  });

  const { userId, name } = createRoomSchema.parse(data);

  const roomId = RoomService.createRoom(createPlayer({ userId, name }));
  socket.emit("salaCriada", roomId);
}
