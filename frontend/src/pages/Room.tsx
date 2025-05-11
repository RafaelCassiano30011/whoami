import { useParams } from "react-router-dom";
import socket from "../socket/socket";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../context/Global";
import EnterName from "../components/EnterName";
import { ListPlayers } from "../components/ListPlayers";

export interface Player {
  id: string;
  name: string;
}

export function Room() {
  const { roomId } = useParams();
  const { playerName, userId } = useGlobalContext();
  const [players, setPlayers] = useState<Player[]>([]);
  const [enterName, setEnterName] = useState(false);

  console.log({
    roomId,
    playerName,
    userId,
    players,
    enterName,
  });

  useEffect(() => {
    if (!userId || !playerName) {
      return setEnterName(true);
    }

    socket.emit("joinRoom", { roomId, userId, name: playerName });
    socket.on("entrouNaSala", ({ players }: { players: Player[] }) => {
      setPlayers(players);
    });

    socket.on("novoJogador", ({ players }: { players: Player[] }) => {
      setPlayers(players);
    });
  }, [roomId, userId, playerName]);

  if (enterName && !playerName)
    return (
      <EnterName
        changeEnterName={() => {
          setEnterName(false);
        }}
      />
    );

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex items-start justify-center min-h-full">
        <ListPlayers players={players} />
      </div>
    </div>
  );
}
