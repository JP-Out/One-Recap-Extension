chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === 'extensionActivated') {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      // Enviar mensagem para o button.js
      chrome.tabs.sendMessage(tabs[0].id, { action: 'extensionActivated' });
    });
  }
});

// function sendMessageToBackground(action, data, callback) {
//   chrome.runtime.sendMessage({ action, data }, callback);
// }

// function sendMessageJumpers() {
//   const title = getMetaDataByProperty('og:title');
//   console.log('title:', title);

//   const duration = getMetaDataByProperty('video:duration');
//   console.log('duration:', duration);

//   const ogURL = getMetaDataByProperty('og:url');
//   const rawURL = ogURL.split('/watch/').pop();
//   const mediaID = rawURL.split('/')[0];
//   console.log('mediaID:', mediaID);

//   const episodeNumberRegex = /E(\d+)/;
//   const episodeNumberMatch = title.match(episodeNumberRegex);
//   const episode_number = episodeNumberMatch ? episodeNumberMatch[1] : null;
//   console.log('episode_number: ', episode_number);

//   sendMessageToBackground('jumpers', { mediaID, duration, episode_number, title }, function (response) {
//     console.log('Answer from background:', response);
//   });
// }

function extractMinutesFromComments() {
  const regex = /\b(\d+:\d+)\b/g;

  const elements = document.querySelectorAll('.expandable-section__text---00oG');

  // Convertendo a coleção em uma array
  const filteredElements = Array.from(elements);

  // Removendo o primeiro elemento da array
  filteredElements.shift();

  for (const element of filteredElements) {
    const text = element.innerText;
    const minutesArray = text.match(regex);

    if (minutesArray && minutesArray.length > 0) {
      const minutesString = minutesArray.join(', ');
      console.log('Minute:', minutesString);
      console.log((seconds = convertToSeconds(minutesString)));

      copyToClipboard(seconds);
      return; // Parar a busca assim que o primeiro resultado for encontrado
    }
  }
  console.log('Not Found!');
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    console.log('Texto copiado para a área de transferência com sucesso!');
  } catch (err) {
    console.error('Erro ao copiar o texto para a área de transferência:', err);
  }
}
