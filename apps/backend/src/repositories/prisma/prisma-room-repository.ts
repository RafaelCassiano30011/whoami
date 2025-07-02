import { Room } from "@prisma/client";
import { RoomsRepository } from "../rooms";
import { prisma } from "../../lib/prisma";

export class PrismaRoomRepository implements RoomsRepository {
  async getRoom(id: string): Promise<Room | null> {
    const room = await prisma.room.findUnique({
      where: {
        id,
      },
    });

    return room;
  }
  createRoom(leaderPlayer: any): void {
    throw new Error("Method not implemented.");
  }
}
