import { io } from "socket.io-client";

// Altere para o endereço do seu backend
const socket = io("http://localhost:3000/");

export default socket;
