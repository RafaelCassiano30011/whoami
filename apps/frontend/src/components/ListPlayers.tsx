import { Player } from "../pages/Room";
import clsx from "clsx";

interface ListPlayersProps {
  players: Player[];
}

export default function ListPlayers({ players }: ListPlayersProps) {
  return (
    <div className="w-full max-w-md h-full flex flex-col">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Jogadores na Sala</h2>
      <div className="space-y-2 overflow-y-auto bg-yellow-50 rounded-xl p-4 h-[500px]">
        {players.map((player) => (
          <div
            key={player.id}
            className="flex items-center p-3 bg-yellow-100 rounded-lg shadow-sm hover:shadow-md hover:bg-yellow-200 transition-all duration-200"
          >
            <div
              className={clsx("w-2 h-2 rounded-full mr-3", player.status === "online" ? "bg-green-500" : "bg-red-500")}
            ></div>
            <span className="text-gray-700 font-medium">{player.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
