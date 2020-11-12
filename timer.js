const timer = document.createElement('span');
timer.textContent = "00:00";

function timerWithClosure () {
  let i = 1; 
  let timerId;
  return (e) => {
    
    if (!e.target.classList.contains('stop-btn')) {
      timer.textContent = "00:01";
      timerId = setTimeout(function tick() {  
                i++;
                if (i < 10) {timer.textContent = `00:0${i}`}
                else if (i > 60 ) {
                  if (i%60 < 10 && Math.trunc(i/60) < 10) {timer.textContent = `0${Math.trunc(i/60)}:0${i%60}`}
                  else if (i%60 < 10) {timer.textContent = `${Math.trunc(i/60)}:0${i%60}`}
                  else if (Math.trunc(i/60) < 10) {timer.textContent = `0${Math.trunc(i/60)}:${i%60}`}
                  else timer.textContent = `${Math.trunc(i/60)}:${i%60}`
                }
                else timer.textContent = `00:${i}`;
                timerId = setTimeout(tick, 1000)
            }, 
        1000)
    }
    else {
      clearTimeout(timerId);
      i = 0;
      timer.textContent = "00:00";
    }
  }
}

const time = timerWithClosure();

export {timer, time}
