import { Socket, Server } from "socket.io";
import { z } from "zod";
import { RoomService } from "../services/roomService";

export function handleSubmitCharacter(
  { socket, io }: { socket: Socket; io: Server },
  data: { roomId: string; userId: string; character: string }
) {
  const schema = z.object({
    roomId: z.string(),
    userId: z.string(),
    character: z.string(),
  });

  const { roomId, userId, character } = schema.parse(data);
  const result = RoomService.submitCharacter(roomId, userId, character);

  console.log(userId, "submitting character:", character);

  if (result.error) {
    return socket.emit("error", { message: result.error });
  }

  io.in(roomId).emit("characterSubmitted", {
    submitsCaractersQuantity: result.submitsCaractersQuantity,
  });

  if (result.assignedCharacters) {
    io.in(roomId).emit("assignedCharacters");

    Object.entries(result.assignedCharacters).map(([userId, character]) => {
      const targetSocket = io.sockets.sockets.get(userId);

      if (!targetSocket) return;

      // Monta uma lista filtrada sem o personagem do próprio usuário
      const otherCharacters = Object.entries(result.assignedCharacters ?? {})
        .filter(([id]) => id !== userId)
        .map(([id, character]) => ({ userId: id, character }));

      console.log(otherCharacters, "arroz");

      // Envia para o jogador atual
      targetSocket.emit("assignedCharactersList", {
        players: otherCharacters,
      });
    });
  }
}
