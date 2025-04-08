import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input(props: InputProps) {
  return (
    <input
      {...props} // Permite passar todas as props HTML padrão para o input
      className={`w-full px-4 py-2 rounded bg-white/10 border border-purple-300 text-white placeholder:text-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition duration-200 ${
        props.className || "" // Permite adicionar classes extras externamente
      }`}
    />
  );
}
