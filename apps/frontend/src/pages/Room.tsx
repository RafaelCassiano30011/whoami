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
  userId: string;
  name: string;
  status?: "online" | "offline";
  adm?: boolean;
  character?: string;
}

export function Room() {
  const { roomId } = useParams();
  const { playerName, userId } = useGlobalContext();
  const [players, setPlayers] = useState<Player[]>([]);
  const [enterName, setEnterName] = useState(false);
  const [roomStatus, setRoomStatus] = useState("initial");
  const [playersAlready, setPlayersAlready] = useState(0);

  useEffect(() => {
    if (!userId || !playerName) {
      return setEnterName(true);
    }

    socket.emit("joinRoom", { roomId, userId, name: playerName });

    const handleEntrouNaSala = ({ players }: { players: Player[] }) => {
      setPlayers(players);
    };

    const handleNovoJogador = ({ players }: { players: Player[] }) => {
      setPlayers(players);
    };

    const handleRoomStatus = ({ status }: { status: string }) => {
      console.log("status", status);
      setRoomStatus(status);
    };

    socket.on("entrouNaSala", handleEntrouNaSala);
    socket.on("novoJogador", handleNovoJogador);
    socket.on("roomStatus", handleRoomStatus);
    socket.on("characterSubmitted", ({ submitsCaractersQuantity }: { submitsCaractersQuantity: number }) => {
      setPlayersAlready(submitsCaractersQuantity);
    });

    // Limpar os eventos ao desmontar o componente ou quando as dependências mudarem
    return () => {
      socket.off("entrouNaSala", handleEntrouNaSala);
      socket.off("novoJogador", handleNovoJogador);
      socket.off("roomStatus", handleRoomStatus);
    };
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

        {roomStatus === "SelectCaracteres" && (
          <SelectCaracteres quantityPlayers={players.length} playersAlready={playersAlready} roomId={roomId!} />
        )}
      </Container>

      {players.find((player) => player.userId === userId)?.adm && roomStatus === "initial" && (
        <Button
          onClick={(e) => {
            e.preventDefault();
            socket.emit("startGame", { roomId, userId });
          }}
          className="absolute left-1/2 bottom-10 -translate-x-1/2 max-w-fit"
        >
          <span className="text-2xl font-bold">Iniciar o jogo</span>
        </Button>
      )}
    </div>
  );
}
