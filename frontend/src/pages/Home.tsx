import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useGlobalContext } from "../context/Global";
import socket from "../socket/socket";
import { useNavigate } from "react-router-dom";

export function Home() {
  const { userId, playerName, handlePlayerNameChange } = useGlobalContext();
  const navigate = useNavigate();

  const createRoom = () => {
    socket.emit("createRoom", { userId, name: playerName });
    socket.on("salaCriada", (roomId) => {
      if (roomId) {
        navigate(`/room/${roomId}`);
      }
    });
  };

  return (
    <>
      <div className="w-full min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold mb-8 text-gray-800">Quem sou eu?</h1>
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              createRoom();
            }}
            className="space-y-6"
          >
            <Input
              value={playerName}
              type="text"
              placeholder="Digite seu nome"
              onChange={(e) => handlePlayerNameChange(e.target.value)}
            />
            <Button
              type="submit"
              className="w-full py-3 px-4 bg-yellow-500 hover:bg-yellow-600 rounded text-white font-bold transition duration-200"
            >
              Criar Sala
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
