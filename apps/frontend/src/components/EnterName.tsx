import { Input } from "./Input";
import { Button } from "./Button";
import { useGlobalContext } from "../context/Global";
import { useState } from "react";

interface Props {
  changeEnterName: () => void;
}

export default function EnterName({ changeEnterName }: Props) {
  const { handlePlayerNameChange } = useGlobalContext();
  const [input, setInput] = useState("");

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-gray-800 p-4 animated-gradient">
      <h2 className="text-5xl font-bold mb-8 text-gray-800">Coloque seu nickname</h2>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handlePlayerNameChange(input);
            changeEnterName();
          }}
          className="space-y-6"
        >
          <Input value={input} type="text" placeholder="Digite seu nome" onChange={(e) => setInput(e.target.value)} />
          <Button type="submit">Entrar na sala</Button>
        </form>
      </div>
    </div>
  );
}
