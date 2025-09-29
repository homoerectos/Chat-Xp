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

  // 🔹 Validação das chaves
  if (keyInput === "BSL123") {
    window.location.href = 'chat1.html';
  } else if (keyInput === "BAK123") {
    window.location.href = 'chat2.html';
  } else if (keyInput === "BPG123") {
    window.location.href = 'chat3.html';
  } else {
    alert("Chave inválida! Tente novamente.");
  }
});
