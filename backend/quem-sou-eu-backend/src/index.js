import express from 'express'
import http from 'http'
import setupWebSocket from './socket.js'

const app = express();
const server = http.createServer(app);

app.use(express.static("public"))

app.get('/', (req, res) => {
  res.sendFile('./public/index.html');
});

setupWebSocket(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});