// Função que envia informações do player de vídeo para a página principal
function sendPlayerDataToCrunchyroll(playerData) {
  window.parent.postMessage({ type: 'playerData', data: playerData }, 'https://www.crunchyroll.com');
}

// Evento DOMContentLoaded que será acionado quando a página for carregada completamente
document.addEventListener('DOMContentLoaded', () => {
  // debugger;
  // Obtém o elemento <video> ou qualquer outra informação necessária
  const videoPlayer = document.getElementById('player0');

  // Verifica se o elemento <video> foi encontrado
  if (videoPlayer) {
    // Extrai as informações relevantes do player de vídeo
    const playerData = {
      src: videoPlayer.src,
    };

    // Envie as informações do player de vídeo para a página principal (crunchyroll.com)
    sendPlayerDataToCrunchyroll(playerData);
  }
});
