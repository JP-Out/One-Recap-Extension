chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === 'extensionActivated') {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      // Enviar mensagem para o findButton.js
      chrome.tabs.sendMessage(tabs[0].id, { action: 'extensionActivated' });
    });
  }
});

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
      return;
    }
  }
  console.log('Not Found!');
}

async function copyToClipboard(seconds) {
  try {
    const commandGetPlayer = "document.getElementById('player0').currentTime = ";

    const textCopy = commandGetPlayer + seconds;

    await navigator.clipboard.writeText(textCopy);
    console.log('Texto copiado para a área de transferência com sucesso!');
  } catch (err) {
    console.error('Erro ao copiar o texto para a área de transferência:', err);
  }
}
