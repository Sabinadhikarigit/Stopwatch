let [seconds, minutes, hours, milliseconds] = [0, 0, 0, 0];
    let display = document.getElementById("display");
    let timer = null;

    function stopwatch() {
      // Increase milliseconds by 10 on each tick (10ms resolution)
      milliseconds += 10;
      if (milliseconds >= 1000) {
        milliseconds = 0;
        seconds++;
        if (seconds == 60) {
          seconds = 0;
          minutes++;
          if (minutes == 60) {
            minutes = 0;
            hours++;
          }
        }
      }

      let h = hours < 10 ? "0" + hours : hours;
      let m = minutes < 10 ? "0" + minutes : minutes;
      let s = seconds < 10 ? "0" + seconds : seconds;
      let ms = milliseconds < 10 ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds;

      // Display format: HH:MM:SS:MMM (milliseconds as three digits)
      display.innerText = `${h}:${m}:${s}:${ms}`;
    }

    document.getElementById("start").addEventListener("click", () => {
      if (timer !== null) clearInterval(timer);
      // 10ms interval gives reasonable millisecond resolution without flooding the event loop
      timer = setInterval(stopwatch, 10);
    });

    document.getElementById("stop").addEventListener("click", () => {
      clearInterval(timer);
      timer = null;
    });

    document.getElementById("reset").addEventListener("click", () => {
      clearInterval(timer);
      timer = null;
      [seconds, minutes, hours, milliseconds] = [0, 0, 0, 0];
      display.innerText = "00:00:00:000";
    });