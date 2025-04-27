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
    return socket.emit("error", { message: result.error });
  }

  console.log("character", character);

  socket.emit("characterSubmitted", {
    submitsCaractersQuantity: result.submitsCaractersQuantity,
  });
}
