import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('CreateHub backend is running!');
});

io.on('connection', (socket) => {
  console.log('Un utilisateur est connecté :', socket.id);

  socket.on('message', (msg) => {
    console.log('Message reçu :', msg);
    socket.broadcast.emit('message', msg);
  });

  socket.on('disconnect', () => {
    console.log('Utilisateur déconnecté :', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Serveur backend en écoute sur le port ${PORT}`);
});
