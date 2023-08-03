chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === 'extensionActivated') {
    const buttonElem = document.getElementById('findButton');
    if (!buttonElem) {
      addButton();
    }
  }
});

function skipToTime() {
  console.log(playerId);
}

// Defina uma variável para armazenar temporariamente os dados do player de vídeo
let videoPlayerData = null;

// Evento que ouve mensagens recebidas de iframes
window.addEventListener('message', (event) => {
  // debugger;
  // Verifica a origem da mensagem para garantir que ela venha do domínio correto
  if (event.origin === 'https://static.crunchyroll.com') {
    const data = event.data;
    if (data.type === 'playerData') {
      //🧠 Por que deve ser esse 'playerData'
      const videoPlayerData = data.data; // Recebe as informações do player de vídeo

      // Definindo o currentTime do player de vídeo
      const videoPlayer = document.getElementById('player0');
      if (videoPlayer) {
        videoPlayer.currentTime = videoPlayerData.currentTime;
      }
    }
  }
});

class CustomButton {
  constructor() {
    this.element = document.createElement('button');
    this.element.textContent = 'Marcar Minuto';
    this.element.id = 'findButton';

    this.element.classList.add('findButton');

    this.element.addEventListener('click', () => {
      // Envia uma mensagem para o iframe solicitando as informações do player de vídeo
      const iframe = document.getElementById('playerFrame'); // Supondo que o iframe do player tenha o ID "playerFrame"
      if (iframe) {
        iframe.contentWindow.postMessage({ type: 'getPlayerData' }, 'https://static.crunchyroll.com');
      }

      // skipToTime();
      // sendMessageJumpers();
      extractMinutesFromComments();
    });
  }

  render() {
    const showMoreElement = document.querySelector('.expandable-section__button--KeiDD');

    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.marginTop = '30px';
    container.style.marginBottom = '-38px';
    container.appendChild(this.element);

    showMoreElement.parentElement.insertBefore(container, showMoreElement.nextSibling);
  }
}

function addButton() {
  const cButton = new CustomButton();
  cButton.render();
}
