chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "extensionActivated") {
    addButton();
  }
});

function addButton() {
  const newButton = document.createElement("button");
  newButton.textContent = "Marcar Minuto";
  newButton.id = "findButton";

  // Adicionando as propriedades de estilo ao botão
  newButton.style.textSizeAdjust = "100%";
  newButton.style.fontSize = "14px";
  newButton.style.webkitFontSmoothing = "antialiased";
  newButton.style.fontFamily = "Lato, Helvetica Neue, helvetica, sans-serif";
  newButton.style.fontWeight = "bold";
  newButton.style.visibility = "visible";
  newButton.style.boxSizing = "border-box";
  newButton.style.boxShadow = "inset 0 0 0 0.125rem currentColor";
  newButton.style.cursor = "pointer";
  newButton.style.height = "2.5rem";
  newButton.style.justifyContent = "center";
  newButton.style.minWidth = "7.5rem";
  newButton.style.padding = "0.5rem 1rem";
  newButton.style.position = "relative";
  newButton.style.textDecoration = "none";
  newButton.style.textTransform = "uppercase";
  newButton.style.transitionDuration = "0.2s";
  newButton.style.transitionProperty = "color, background-color, box-shadow";
  newButton.style.transitionTimingFunction = "ease";
  newButton.style.userSelect = "none";
  newButton.style.color = "#dadada";

  // Centralizar verticalmente o botão usando flexbox
  newButton.style.display = "inline-flex";
  newButton.style.alignItems = "center"; // Centralizar verticalmente o conteúdo do botão

  // Evitar que o texto do botão quebre em várias linhas
  newButton.style.whiteSpace = "nowrap";

  // Localizar o elemento "Mostrar mais"
  const showMoreElement = document.querySelector(
    ".expandable-section__button--KeiDD"
  );

  // Criar um contêiner para centralizar o botão e o elemento "Mostrar mais"
  const container = document.createElement("div");
  container.style.display = "flex";
  container.style.marginTop = "30px"; // Margem superior para distanciar do "Mostrar mais"
  container.style.marginBottom = "-38px"; // Margem inferior para distanciar do "Mais Populares"

  // debugger;
  // Adicionar o botão "Marcar Minuto" e o elemento "Mostrar mais" ao contêiner
  container.appendChild(newButton);

  // Inserir o contêiner após o elemento "Mostrar mais"
  showMoreElement.parentElement.insertBefore(
    container,
    showMoreElement.nextSibling
  );

  newButton.addEventListener("click", () => {
    extractMinutesFromComments();
  });
}

function extractMinutesFromComments() {
  // Seu código para extrair os minutos dos comentários
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
      const seconds = convertToSeconds(minutesArray[0]);
      console.log(seconds);
      return; // Parar a busca assim que o primeiro resultado for encontrado
    }
  }

  console.log("Not Found!");
}

function convertToSeconds(minute) {
  const [minutes, seconds] = minute.split(":");
  const totalSeconds = parseInt(minutes, 10) * 60 + parseInt(seconds, 10);
  return totalSeconds;
}
