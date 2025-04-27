import express, { Request, Response } from "express";
import http from "http";
import setupWebSocket from "./socket/index";

const app = express();
const server = http.createServer(app);

app.use(express.static("public"));

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello World");
});

setupWebSocket(server);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
