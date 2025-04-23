import { Socket } from "socket.io";
import { z } from "zod";
import { RoomService } from "../services/roomService";

export function handleSubmitCharacter(socket: Socket, data: { roomId: string; userId: string; character: string }) {
  const schema = z.object({
    roomId: z.string(),
    userId: z.string(),
    character: z.string(),
  });

  const { roomId, userId, character } = schema.parse(data);
  const result = RoomService.submitCharacter(roomId, userId, character);

  if (result.error) {
    socket.emit("error", { message: result.error });
  } else {
    socket.emit("characterSubmitted");
  }
}