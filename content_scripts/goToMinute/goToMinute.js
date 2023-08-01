function goToMinute(minute) {
  const player = document.getElementById('player0');
  if (player) {
    const currentTime = player.currentTime;
    const secondsToJump = minute * 60; // Converta o minuto para segundos
    player.currentTime = currentTime + secondsToJump;
  }
}

click() {
    if (this.isVisible()) {
      this.skipped = true;
      goToTime(this.end);
    }
  }
