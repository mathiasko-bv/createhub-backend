const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

app.use(cors());
app.use(bodyParser.json());

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'test@createhub.com' && password === '1234') {
    res.send('Connexion réussie');
  } else {
    res.status(401).send('Identifiants incorrects');
  }
});

io.on('connection', (socket) => {
  console.log('Un utilisateur connecté');
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

server.listen(3000, () => console.log('Backend (avec chat) sur http://localhost:3000'));
