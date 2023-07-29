chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "extensionActivated") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      // Enviar mensagem para o button.js
      chrome.tabs.sendMessage(tabs[0].id, { action: "extensionActivated" });
    });
  }
});

function extractMinutesFromComments() {
  const regex = /\b(\d+:\d+)\b/g;

  const elements = document.querySelectorAll(
    ".expandable-section__text---00oG"
  );

  // Convertendo a coleção em uma array
  const filteredElements = Array.from(elements);

  // Removendo o primeiro elemento da array
  filteredElements.shift();

  for (const element of filteredElements) {
    const text = element.innerText;
    const minutesArray = text.match(regex);

    if (minutesArray && minutesArray.length > 0) {
      console.log(minutesArray);

      // Copiar para a área de transferência
      const minutesString = minutesArray.join(", "); // Transforma a array em uma string separada por vírgulas
      copyToClipboard(minutesString);

      return; // Parar a busca assim que o primeiro resultado for encontrado
    }
  }
  console.log("Not Found!");
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    console.log("Texto copiado para a área de transferência com sucesso!");
  } catch (err) {
    console.error("Erro ao copiar o texto para a área de transferência:", err);
  }
}

function convertToSeconds(minute) {
  const [minutes, seconds] = minute.split(":");
  const totalSeconds = parseInt(minutes, 10) * 60 + parseInt(seconds, 10);
  return totalSeconds;
}
