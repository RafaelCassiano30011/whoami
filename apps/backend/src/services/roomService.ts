import { randomUUID } from "crypto";

export const rooms: {
  [key: string]: {
    players: Player[];
    characters: { [userId: string]: string };
    assignedCharacters?: { [userId: string]: string };
  };
} = {};

export const players: {
  [userId: string]: string;
} = {};

export interface Player {
  userId: string;
  name: string;
  status: "online" | "offline";
  adm?: boolean;
}

export const RoomService = {
  createRoom(player: Omit<Player, "status">) {
    const roomId = randomUUID();
    rooms[roomId] = {
      players: [{ ...player, status: "online", adm: true }],
      characters: {},
    };

    players[player.userId] = roomId;

    return roomId;
  },

  joinRoom(roomId: string, player: Omit<Player, "status">) {
    const room = rooms[roomId];
    if (!room) return { error: "Sala não encontrada" };

    if (room.players.length >= 8) return { error: "Sala cheia" };

    const alreadyInRoom = room.players.find((p) => p.userId === player.userId);
    if (!alreadyInRoom) {
      room.players.push({ ...player, status: "online" });
      players[player.userId] = roomId;
    }

    return { newPlayer: player, players: room.players };
  },

  leaveRoom(roomId: string, userId: string) {
    const room = rooms[roomId];
    if (!room) return false;

    room.players = room.players.filter((p) => p.userId !== userId);
    delete room.characters[userId];
    room.assignedCharacters && delete room.assignedCharacters[userId];

    if (room.players.length === 0) {
      delete rooms[roomId];
      return true;
    }

    return false;
  },

  getRoom(roomId: string) {
    console.log("getRoom", {
      rooms,
      roomId,
    });

    return rooms[roomId];
  },

  getRoomPlayers(roomId: string) {
    console.log("getRoom", {
      rooms,
      roomId,
    });

    return rooms[roomId].players || [];
  },

  submitCharacter(roomId: string, userId: string, characterName: string) {
    const room = rooms[roomId];
    if (!room) return { error: "Sala não encontrada" };

    room.characters[userId] = characterName;

    const submitsCaractersQuantity = room.players.filter((p) => room.characters[p.userId]).length;
    if (submitsCaractersQuantity === room.players.length) {
      this.distributeCharacters(roomId);

      return { success: true, submitsCaractersQuantity, assignedCharacters: room.assignedCharacters };
    }

    return { success: true, submitsCaractersQuantity };
  },

  distributeCharacters(roomId: string) {
    const room = rooms[roomId];
    if (!room) return;

    const entries = Object.entries(room.characters);
    const players = entries.map(([userId, _]) => userId);
    const characters = entries.map(([_, name]) => name);

    let shuffled = [...characters];
    let attempts = 0;
    const maxAttempts = 10;

    while (attempts < maxAttempts) {
      shuffled = [...characters].sort(() => Math.random() - 0.5);

      const valid = players.every((userId, i) => {
        return room.characters[userId] !== shuffled[i];
      });

      if (valid) break;
      attempts++;
    }

    const assigned: { [userId: string]: string } = {};
    players.forEach((userId, i) => {
      assigned[userId] = shuffled[i];
    });

    console.log("Assigned characters:", assigned);

    room.assignedCharacters = assigned;
  },

  getAssignedCharacter(roomId: string, userId: string) {
    const room = rooms[roomId];
    if (!room?.assignedCharacters) return null;
    return room.assignedCharacters[userId];
  },
};
