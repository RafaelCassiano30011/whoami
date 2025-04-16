import { randomUUID } from "crypto";

const rooms: { [key: string]: { players: Player[] } } = {};

export interface Player {
  userId: string;
  name: string;
  status: "online" | "offline";
}

export const RoomService = {
  createRoom(player: Omit<Player, "status">) {
    const roomId = randomUUID();
    rooms[roomId] = { players: [{ ...player, status: "online" }] };

    console.log(rooms[roomId].players);

    return roomId;
  },

  joinRoom(roomId: string, player: Omit<Player, "status">) {
    console.log(roomId, player);

    const room = rooms[roomId];

    console.log({ room });

    if (!room) return { error: "Sala não encontrada" };

    if (room.players.length >= 8) {
      return { error: "Sala cheia" };
    }

    if (!room.players.find((p) => p.userId === player.userId)) room.players.push({ ...player, status: "online" });

    return { newPlayer: player, players: room.players };
  },

  leaveRoom(roomId: string, userId: string) {
    const room = rooms[roomId];
    if (!room) return false;

    room.players = room.players.filter((p) => p.userId !== userId);
    if (room.players.length === 0) {
      delete rooms[roomId];
      return true;
    }

    return false;
  },

  getRoom(roomId: string) {
    return rooms[roomId];
  },
};
