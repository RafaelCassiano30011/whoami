const express = require('express');
const http = require('http');
const setupWebSocket = require('./socket');

const app = express();
const server = http.createServer(app);

setupWebSocket(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});