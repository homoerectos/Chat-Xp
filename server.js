const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// 🔹 aqui você diz para o Express servir os arquivos da pasta "public"
app.use(express.static('public'));

// 🔹 rota principal -> login.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});

io.on('connection', socket => {
  console.log('Novo usuário conectado');
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
});

// 🔹 porta
const PORT = process.env.PORT || 4000;
http.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
