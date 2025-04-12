import React from "react";

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  type?: "submit" | "reset" | "button";
}

export function Button({ children, ...rest }: ButtonProps) {
  return (
    <button
      className="w-full py-3 px-4 bg-yellow-500 hover:bg-yellow-600 rounded text-white font-bold transition duration-200"
      {...rest}
    >
      {children}
    </button>
  );
}
