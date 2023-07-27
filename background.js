
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    // Verificar se a página foi completamente carregada e se o elemento de comentários está presente
    if (changeInfo.status === 'complete' && tab.url.startsWith('https://www.crunchyroll.com/') && tab.title.toLowerCase().includes('one piece')) {
      // Enviar mensagem para o content.js apenas se a página for da Crunchyroll e contiver "one piece" no título
      chrome.tabs.sendMessage(tabId, { action: 'extensionActivated' });
    }
  });
  