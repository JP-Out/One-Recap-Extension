chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === 'extensionActivated') {
    const buttonElem = document.getElementById('findButton');
    if (!buttonElem) {
      addButton();
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
      // goToMinute(5);
      sendMessageJumpers();
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
