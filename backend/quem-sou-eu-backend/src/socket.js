const WebSocket = require('ws');

function setupWebSocket(server) {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    console.log('Novo jogador conectado');

    ws.on('message', (message) => {
      console.log('Mensagem recebida:', message.toString());
      
      ws.send(`Recebido: ${message}`);
    });

    ws.on('close', () => {
      console.log('Jogador desconectado');
    });
  });
}

module.exports = setupWebSocket;