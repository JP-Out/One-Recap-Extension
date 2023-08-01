function convertToSeconds(minute) {
  const [minutes, seconds] = minute.split(':');
  const totalSeconds = parseInt(minutes, 10) * 60 + parseInt(seconds, 10);
  return totalSeconds;
}
