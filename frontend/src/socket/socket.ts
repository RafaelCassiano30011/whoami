import { io } from "socket.io-client";

// Altere para o endereço do seu backend
const socket = io("https://whoami-0gqb.onrender.com/");

export default socket;
