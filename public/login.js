const startBtn = document.getElementById('startBtn');

startBtn.addEventListener('click', () => {
    const nameInput = document.getElementById('playerName').value.trim();
    const keyInput = document.getElementById('serverKey').value.trim();

    if (!nameInput) { 
        alert('Digite um nome válido!'); 
        return; 
    }
    if (!keyInput) { 
        alert('Digite a chave do servidor!'); 
        return; 
    }

    localStorage.setItem('playerName', nameInput);

    // 🔹 Redireciona para a sala correta
    switch(keyInput) {
        case "BSL123":
            window.location.href = 'chat1.html';
            break;
        case "BAK123":
            window.location.href = 'chat2.html';
            break;
        case "BPG123":
            window.location.href = 'chat3.html';
            break;
        default:
            alert("Chave inválida! Tente novamente.");
    }
});
