/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();

const httpServer = createServer(app);

app.use(cors({
  origin: 'http://localhost:3000'
}));

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to server!' });
});

io.on('connection', (socket) => {
  console.log('+1 user connected');
  socket.on('event', (event) => {
    console.log({event});
    // socket.emit('pong');
  });
});

const port = process.env.PORT || 3333;
httpServer.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

httpServer.on('error', console.error);
