import { Room } from "@prisma/client";

export interface RoomsRepository {
  getRoom(id: string): Promise<Room | null>;

  createRoom(leaderPlayer: any): void;
}
