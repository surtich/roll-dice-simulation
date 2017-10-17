let isPlaying = false;

const render = () => {
  const playButton = document.querySelector('.button-play');
  const inputs = document.querySelectorAll('.mainboard input');
  const mainContainer = document.querySelector('.main-container');
  
  playButton.classList.toggle('playing', isPlaying);
  [].forEach.call(inputs, el => el.disabled = isPlaying);
  mainContainer.hidden = !isPlaying;
};



const events = () => {
  const playButton = document.querySelector('.button-play');createPlayers
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

const createPlayer = ({color, name, numDices}) => {
  const player = document.createElement('div');
  player.className = `player ${color}-complementary border-${color}-complementary bg-${color}`;
  player.innerHTML = name;
  return player;
}

const createPlayers = () => {
  const inputPlayer = document.querySelector('.input-players');
  const inputDices = document.querySelector('.input-dices');
  const main = document.querySelector('main');
  
  const numPlayers = parseInt(inputPlayer.value, 10);
  const numDices = parseInt(inputDices.value, 10);
  
  const namePlayer$ = Rx.Observable.range(1, numPlayers)
                                   .map(n => `Player${n}`);
  
  const color$ = Rx.Observable.pairs(colors)
                              .map(([key, _]) => (key))
                              .repeat(Infinity);
  
  const player$ = Rx.Observable.zip(namePlayer$, color$, (name, color) => createPlayer({name, color, numDices}))
                               .do(player => main.appendChild(player))
                               .subscribe({complete: () => console.log('End!')});
};

const reset = () => {
  const main = document.querySelector('main');
  main.innerHTML = '';
};

const play = () => {
  let timeout = null;
  if(isPlaying) return;
  isPlaying = true;
  createPlayers();
  checkTimeout(setTimeout(stop, 3000));
  render();
};

const stop = () => {
  if (!isPlaying) return;
  isPlaying = false;
  checkTimeout();
  render();
  reset();
};


init();