const playerName = localStorage.getItem('playerName') || "Desconhecido";
document.getElementById('welcome').textContent = `Olá, ${playerName}! Comece a conversar.`;

const socket = io();

// ⬅️ Flag para garantir que a conexão está pronta
let connected = false;

socket.on('connect', () => {
    connected = true;
    socket.emit('join', playerName);
});

// Elementos DOM
const messages = document.getElementById('messages');
const msgInput = document.getElementById('msgInput');
const sendBtn = document.getElementById('sendBtn');

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

    if (!connected) {
        alert('Conexão com o servidor não estabelecida!');
        return;
    }

    socket.emit('chat message', { name: playerName, msg });
    msgInput.value = '';
}

// Receber mensagens
socket.on('chat message', data => {
    const div = document.createElement('div');
    div.innerHTML = `<b style="color:${stringToColor(data.name)}">${data.name}</b>: ${data.msg}`;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
});

// Enviar GIF
function sendGif(src) {
    const hora = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    if (!connected) return;
    socket.emit('chat message', { name: playerName, msg: `<img src="${src}" width="80">`, time: hora });
}
