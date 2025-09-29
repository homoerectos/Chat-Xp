const express = require('express');
const app = express();
const http = require('http').createServer(app);
const { Server } = require('socket.io');

// Criando 3 instâncias de servidores de socket.io
const io1 = new Server(http, { path: '/server1' });
const io2 = new Server(http, { path: '/server2' });
const io3 = new Server(http, { path: '/server3' });

// Servir arquivos estáticos
app.use(express.static('public'));

// Rota principal -> login
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});

// Rotas dos chats
app.get('/chat1', (req, res) => {
  res.sendFile(__dirname + '/public/chat1.html');
});
app.get('/chat2', (req, res) => {
  res.sendFile(__dirname + '/public/chat2.html');
});
app.get('/chat3', (req, res) => {
  res.sendFile(__dirname + '/public/chat3.html');
});

// 🔹 Servidor 1
io1.on('connection', socket => {
  console.log('Usuário conectado ao Servidor 1');
  socket.on('chat message', msg => {
    io1.emit('chat message', msg);
  });
});

// 🔹 Servidor 2
io2.on('connection', socket => {
  console.log('Usuário conectado ao Servidor 2');
  socket.on('chat message', msg => {
    io2.emit('chat message', msg);
  });
});

// 🔹 Servidor 3
io3.on('connection', socket => {
  console.log('Usuário conectado ao Servidor 3');
  socket.on('chat message', msg => {
    io3.emit('chat message', msg);
  });
});

// Porta
const PORT = process.env.PORT || 4000;
http.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
