/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import socket from "../socket/socket";
import { useNavigate } from "react-router-dom";
import { roomNotExist } from "../error/roomNotExist";

interface GlobalContextType {
  userId: string;
  playerName: string;
  handlePlayerNameChange: (name: string) => void;
}

const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType);

interface GlobalContextProviderProps {
  children: React.ReactNode;
}

export const GlobalContextProvider = ({ children }: GlobalContextProviderProps) => {
  const [userId, setUserId] = useState<string>("");
  const [playerName, setPlayerName] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (playerName) {
      localStorage.setItem("playerName", playerName);
    }

    if (userId) {
      localStorage.setItem("userId", userId);
    }
  }, [playerName, userId]);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedPlayerName = localStorage.getItem("playerName");

    if (storedUserId) {
      setUserId(storedUserId);
    }

    if (storedPlayerName) {
      setPlayerName(storedPlayerName);
    }

    if (!storedUserId) {
      socket.on("id", (userId) => {
        setUserId(userId);
      });
    }

    socket.on("error", (error) => {
      console.log("Error socket: ", error);
      const errorMessage = error.message || "An error occurred";

      if (errorMessage === "Sala não encontrada") {
        roomNotExist(navigate);
      }
    });
  }, []);

  const handlePlayerNameChange = (name: string) => {
    setPlayerName(name);
  };

  return (
    <GlobalContext.Provider value={{ userId, playerName, handlePlayerNameChange }}>{children}</GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
