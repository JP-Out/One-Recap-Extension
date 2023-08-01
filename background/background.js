chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  // Verificar se a página foi completamente carregada e se o elemento de comentários está presente
  if (
    changeInfo.status === 'complete' &&
    tab.url.startsWith('https://www.crunchyroll.com/') &&
    tab.title.toLowerCase().includes('one piece')
  ) {
    // Enviar mensagem para o content.js apenas se a página for da Crunchyroll e contiver "one piece" no título
    chrome.tabs.sendMessage(tabId, { action: 'extensionActivated' });
  }
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  // Verifica o tipo da mensagem recebida
  switch (message.action) {
    case 'jumpers':
      const { mediaID, duration, episode_number, title} = message.data;

      sendResponse('Resposta do background.js');
      break;

    default:
      sendResponse();
      break;
  }

  // sendResponse será chamada de forma assíncrona
  return true;
});
