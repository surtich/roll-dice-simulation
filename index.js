let isPlaying = false;

const render = () => {
  const playButton = document.querySelector('.button-play');
  const inputs = document.querySelectorAll('.mainboard input');
  
  playButton.classList.toggle('playing', isPlaying);
  [].forEach.call(inputs, el => el.disabled = isPlaying);
};

const events = () => {
  const playButton = document.querySelector('.button-play');
  playButton.addEventListener('click', () => isPlaying ? stop() : play());
};

const init = () => {
  isPlaying = false;
  window.onload = () => {
    events();
    render();
  };
};

const checkTimeout = (function() {
  let timeout = null;
  return function(newTimeout) {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    if (newTimeout) {
      timeout = newTimeout;
    }
  }
})();

const play = () => {
  let timeout = null;
  if(isPlaying) return;
  isPlaying = true;
  checkTimeout(setTimeout(stop, 3000));
  render();
};

const stop = () => {
  if (!isPlaying) return;
  isPlaying = false;
  checkTimeout();
  render();
};


init();