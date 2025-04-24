import { useParams } from "react-router-dom";
import socket from "../socket/socket";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../context/Global";
import EnterName from "../components/EnterName";
import ListPlayers from "../components/ListPlayers";
import Container from "../components/Container";
import { Button } from "../components/Button";
import SelectCaracteres from "../components/SelectCaracteres";

export interface Player {
  id: string;
  name: string;
  status?: "online" | "offline";
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
    <div>
      <Container className="flex justify-start items-start mt-10">
        <ListPlayers players={players} />
        <SelectCaracteres></SelectCaracteres>
      </Container>

      <Button onClick={() => {}} className="absolute left-1/2 bottom-10 -translate-x-1/2 max-w-fit">
        <span className="text-2xl font-bold">Iniciar o jogo</span>
      </Button>
    </div>
  );
}
