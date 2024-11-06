import { ref, onUnmounted } from 'vue';

export function useCountdown() {
  const showCountdown = ref(false);
  const countdownExpired = ref(false);
  const countdown = ref('');

  let interval: number | null = null;

  const updateCountdown = (timerEnds: string) => {
    const endTime = new Date(timerEnds).getTime();
    const now = new Date().getTime();
    const timeDifference = endTime - now;

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    if (days === 0) {
      showCountdown.value = true;
      countdown.value = `Noch ${hours}h ${minutes}m ${seconds}s Zeit zum reagieren`;

      if (!interval) {
        interval = window.setInterval(() => {
          updateCountdown(timerEnds);
        }, 1000) as unknown as number; // Cast to number
      }
    } else if (days < 0) {
      /* if timer expires */
      countdownExpired.value = true;
      countdown.value = 'Zeit zum reagieren abgelaufen';
    } else {
      /* if deadline is not less than one day away */
      showCountdown.value = false;
      countdown.value = '';
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
    }
  };

  // Function to start the countdown
  const startCountdown = (timerEnds: string) => {
    updateCountdown(timerEnds);
  };

  // Cleanup when the component is unmounted
  onUnmounted(() => {
    if (interval) {
      clearInterval(interval);
    }
  });

  return {
    startCountdown,
    showCountdown,
    countdownExpired,
    countdown,
  };
}
