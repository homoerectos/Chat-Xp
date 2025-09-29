// Pega o nome do jogador do localStorage
const playerName = localStorage.getItem('playerName') || "Desconhecido";

// Atualiza o texto de boas-vindas
document.getElementById('welcome').textContent = `Olá, ${playerName}! Comece a conversar.`;

// Conecta ao socket
const socket = io();

socket.on('connect', () => {
    socket.emit('join', playerName);
});

// Elementos DOM
const messages = document.getElementById('messages');
const msgInput = document.getElementById('msgInput');
const sendBtn = document.getElementById('sendBtn');

// Enviar mensagem
sendBtn.addEventListener('click', sendMessage);
msgInput.addEventListener('keydown', e => { if(e.key==='Enter') sendMessage(); });

function stringToColor(str){
    let hash = 0;
    for(let i=0;i<str.length;i++) hash = str.charCodeAt(i) + ((hash<<5)-hash);
    let color = "#";
    for(let i=0;i<3;i++) color += ("00" + ((hash>>(i*8))&0xFF).toString(16)).slice(-2);
    return color;
}

function sendMessage() {
    const msg = msgInput.value.trim();
    if (!msg) return;

    socket.emit('chat message', { name: playerName, msg });
    msgInput.value = '';
}

// Receber mensagem do servidor
socket.on('chat message', data => {
    const div = document.createElement('div');
    div.innerHTML = `<b style="color:${stringToColor(data.name)}">${data.name}</b>: ${data.msg}`;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
});

// Enviar GIF
function sendGif(src) {
    const hora = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    socket.emit('chat message', { name: playerName, msg: `<img src="${src}" width="80">`, time: hora });
}
