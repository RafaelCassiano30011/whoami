import { Console } from 'console';
import { randomUUID } from 'crypto';
import { Server } from 'socket.io';

const rooms = {}

function setupWebSocket(server) {
  const wss = new Server(server);

  wss.on('connection', (ws) => {

    ws.emit("id", ws.id)

    ws.on('createRoom', (userId) => {
      const roomId = randomUUID();
      rooms[roomId] = {players:[userId]}

      ws.join(roomId);
      ws.emit("salaCriada", roomId);
      console.log(ws.emit)
    });

    ws.on('message', (message) => {
      console.log('Mensagem recebida:', message.toString());
      
      ws.send(`Recebido: ${message}`);
    });

    ws.on('close', () => {
      console.log('Jogador desconectado');
    });
  });
}

export default setupWebSocket;