const stopBtnEL = document.querySelector('[data-stop]');
const startBtnEl = document.querySelector('[data-start]');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

stopBtnEL.disabled = true;

let intervalId;

function startInterval() {
  startBtnEl.disabled = true;
  stopBtnEL.disabled = false;
  intervalId = setInterval(BackgroundColor, 1000);
}

function stopInterval() {
  stopBtnEL.disabled = true;
  startBtnEl.disabled = false;
  clearInterval(intervalId);
}

function BackgroundColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

startBtnEl.addEventListener('click', startInterval);
stopBtnEL.addEventListener('click', stopInterval);
