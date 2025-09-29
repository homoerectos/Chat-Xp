const playerName = localStorage.getItem('playerName') || "Desconhecido";
document.getElementById('welcome').textContent = `Olá, ${playerName}! Comece a conversar.`;

// Pega o servidor da sala
const serverPath = document.body.dataset.server;
const socket = io({ path: serverPath });

// Flag de conexão
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

function sendMessage() {
    const msg = msgInput.value.trim();
    if (!msg) return;
    if (!connected) { alert("Ainda não conectado!"); return; }

    socket.emit('chat message', { name: playerName, msg });
    msgInput.value = '';
}

socket.on('chat message', data => {
    const div = document.createElement('div');
    div.innerHTML = `<b style="color:${stringToColor(data.name)}">${data.name}</b>: ${data.msg}`;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
});

function sendGif(src) {
    if (!connected) return;
    socket.emit('chat message', { name: playerName, msg: `<img src="${src}" width="80">` });
}

function stringToColor(str){
    let hash = 0;
    for(let i=0;i<str.length;i++) hash = str.charCodeAt(i) + ((hash<<5)-hash);
    let color = "#";
    for(let i=0;i<3;i++) color += ("00" + ((hash>>(i*8))&0xFF).toString(16)).slice(-2);
    return color;
}
