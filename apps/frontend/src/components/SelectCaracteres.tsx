import { useEffect, useState } from "react";
import { Input } from "./Input";
import { motion } from "framer-motion";
import socket from "../socket/socket";
import { useGlobalContext } from "../context/Global";
import { Button } from "./Button";

interface Props {
  roomId: string;
}

export default function SelectCaracteres({ roomId }: Props) {
  const [time, setTime] = useState(10);
  const [timeActive, setTimeActive] = useState(true);
  const { userId } = useGlobalContext();
  const [character, setCharacter] = useState("");

  //useEffect(() => {
  //  let intervalo: NodeJS.Timeout;

  //  if (timeActive && time > 0) {
  //    intervalo = setInterval(() => {
  //      setTime((t) => t - 1);
  //    }, 1000);
  //  } else if (time === 0) {
  //    setTimeActive(false);
  //    socket.emit("submitCharacter", { roomId, userId, character: character });
  //  }

  //  return () => clearInterval(intervalo);
  //}, [timeActive, time]);

  return (
    <div className="flex items-center justify-center absolute h-full w-full left-0 top-0 animated-gradient">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="flex flex-col w-[700px]"
      >
        <form className="w-full flex flex-col items-center gap-8">
          <h2 className="text-5xl font-bold text-gray-800">Escolha em {time} </h2>
          <Input
            placeholder="Escolhar algo (obs: Pessoa famosa,personagem,objeto e etc) para alguem adivinhar"
            value={character}
            onInput={(e) => {
              setCharacter(e.currentTarget.value);
            }}
          />
          <Button
            onClick={(e) => {
              e.preventDefault();
              socket.emit("submitCharacter", { roomId, userId, character: character });
              setTimeActive(false);
            }}
          >
            <span className="text-2xl font-bold leading-none">Pronto</span>
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
