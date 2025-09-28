const startBtn = document.getElementById('startBtn');
startBtn.addEventListener('click', () => {
    const nameInput = document.getElementById('playerName').value.trim();
    if (!nameInput) { alert('Digite um nome válido!'); return; }
    localStorage.setItem('playerName', nameInput);
    window.location.href = 'chatxp.html';
});