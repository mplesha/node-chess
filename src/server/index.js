import path from 'path';
import express from 'express';
import { Server } from 'http';
import socket from 'socket.io';

let app = express();
let server = Server(app);
let io = socket(server);

server.listen(process.env.PORT);

app.use(express.static(path.resolve(__dirname, '../client'), { index: 'index.html' }));

io.on('connection', socket => {
  socket.emit('msg', 'hello world!');
});
