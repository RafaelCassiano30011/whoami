import { Player } from "../pages/Room";

interface Props {
  players: Player[];
}

export function ListPlayers({ players }: Props) {
  return (
    <div className="flex bg-red-500 h-full max-w-[300px]">
      <ul>
        {players.map((player) => (
          <li>{player.name}</li>
        ))}
      </ul>
    </div>
  );
}
