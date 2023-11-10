import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';

const startBtnEl = document.querySelector('[data-start]');
const datetimePickerEl = document.querySelector('#datetime-picker');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const now = Date.now();

    if (selectedDate <= now) {
      Notiflix.Notify.failure('Please choose a date in the future');
      datetimePickerEl.value = '';
      startBtnEl.disabled = true;
      resetTimerDisplay();
      stopInterval();
      return;
    }

    options.selectedDates = selectedDates;
    console.log(selectedDate);
    startBtnEl.disabled = false;
  },
};

flatpickr('#datetime-picker', options);

let intervalID;
let isTimerRunning = false;

startBtnEl.disabled = true;

startBtnEl.addEventListener('click', () => {
  if (!isTimerRunning) {
    startInterval();
  }
});

function calculateTimeLeft() {
  const now = Date.now();

  if (options.selectedDates && options.selectedDates.length > 0) {
    const selectDate = options.selectedDates[0];
    const diff = selectDate - now;

    if (diff < 0) {
      resetTimerDisplay();
      stopInterval();
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(diff);

    document.querySelector('[data-days]').textContent = addLeadingZero(days);
    document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
    document.querySelector('[data-minutes]').textContent =
      addLeadingZero(minutes);
    document.querySelector('[data-seconds]').textContent =
      addLeadingZero(seconds);
  }
}

function startInterval() {
  isTimerRunning = true;
  intervalID = setInterval(calculateTimeLeft, 1000);
}

function stopInterval() {
  isTimerRunning = false;
  clearInterval(intervalID);
}

function resetTimerDisplay() {
  document.querySelector('[data-days]').textContent = '00';
  document.querySelector('[data-hours]').textContent = '00';
  document.querySelector('[data-minutes]').textContent = '00';
  document.querySelector('[data-seconds]').textContent = '00';
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}
