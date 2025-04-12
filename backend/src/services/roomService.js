import { randomUUID } from "crypto";

const rooms = {};

export const RoomService = {
  createRoom(player) {
    const roomId = randomUUID();
    rooms[roomId] = { players: [player] };

    console.log(rooms);

    return roomId;
  },

  joinRoom(roomId, player) {
    console.log(roomId, player);

    const room = rooms[roomId];

    console.log({ room });

    if (!room) return { error: "Sala não encontrada" };

    if (room.players.length >= 8) {
      return { error: "Sala cheia" };
    }

    if (!room.players.find((p) => p.id === player.id)) room.players.push(player);

    return { newPlayer: player, players: room.players };
  },

  leaveRoom(roomId, userId) {
    const room = rooms[roomId];
    if (!room) return false;

    room.players = room.players.filter((p) => p.id !== userId);
    if (room.players.length === 0) {
      delete rooms[roomId];
      return true;
    }

    return false;
  },

  getRoom(roomId) {
    return rooms[roomId];
  },
};
