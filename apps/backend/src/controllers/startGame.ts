import { Server } from "socket.io";
import { z } from "zod";
import { RoomService } from "../services/roomService";

export function startGame(io: Server, data: { roomId: string; userId: string }) {
  const schema = z.object({
    roomId: z.string(),
    userId: z.string(),
  });

  console.log("startGame", data);

  const { roomId, userId } = schema.parse(data);

  const room = RoomService.getRoom(roomId);
  console.log("room", room);
  const playerIsLeader = room?.players.find((player) => player.userId === userId)?.adm;

  if (playerIsLeader) {
    io.in(roomId).emit("roomStatus", { status: "SelectCaracteres" });
  } else {
    //TODO Error
  }
}
