import { Socket } from "socket.io";
import { RoomService } from "../services/roomService";
import { z } from "zod";

export function leaveRoom(socket: Socket, data: { roomId: string; userId: string }) {
  const leaveRoomSchema = z.object({
    roomId: z.string(),
    userId: z.string(),
  });

  const { roomId, userId } = leaveRoomSchema.parse(data);

  const wasRoomDeleted = RoomService.leaveRoom(roomId, userId);

  socket.leave(roomId);
  socket.to(roomId).emit("playerLeft", { userId });

  console.log(`${userId} saiu da sala ${roomId}`);
  if (wasRoomDeleted) {
    console.log(`Room ${roomId} deleted`);
  }
}
