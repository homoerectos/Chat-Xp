// 1️⃣ Pega o playerName antes de qualquer coisa
const playerName = localStorage.getItem('playerName') || "Desconhecido";
document.getElementById('welcome').textContent = `Olá, ${playerName}! Comece a conversar.`;

// 2️⃣ Conecta ao socket
const serverPath = document.body.dataset.server;
const socket = io({ path: serverPath });

// 3️⃣ Confirma conexão
socket.on('connect', () => {
    socket.emit('join', playerName);
});

// 4️⃣ Elementos DOM
const messages = document.getElementById('messages');
const msgInput = document.getElementById('msgInput');
const sendBtn = document.getElementById('sendBtn');

sendBtn.addEventListener('click', sendMessage);
msgInput.addEventListener('keydown', e => { if (e.key === 'Enter') sendMessage(); });

// 5️⃣ Cor do nome
function stringToColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
    let color = "#";
    for (let i = 0; i < 3; i++) color += ("00" + ((hash >> (i * 8)) & 0xFF).toString(16)).slice(-2);
    return color;
}

// 6️⃣ Função para enviar mensagem normal
function sendMessage() {
    const msg = msgInput.value.trim();
    if (!msg) return;
    socket.emit('chat message', { name: playerName, msg });
    msgInput.value = '';
}

// 7️⃣ Receber mensagens
socket.on('chat message', data => {
    const div = document.createElement('div');
    div.innerHTML = `<b style="color:${stringToColor(data.name)}">${data.name}</b>: ${data.msg}`;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
});

// 8️⃣ Para enviar GIFs
function sendGif(src) {
    const hora = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    socket.emit('chat message', { 
        name: playerName, 
        msg: `<img src="${src}" width="80">`, 
        time: hora 
    });
}
