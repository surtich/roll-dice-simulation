const render = (isPlaying = false) => {
  const playButton = document.querySelector('.button-play');
  const inputs = document.querySelectorAll('.mainboard input');
  const mainContainer = document.querySelector('.main-container');
  
  playButton.classList.toggle('playing', isPlaying);
  [].forEach.call(inputs, el => el.disabled = isPlaying);
  mainContainer.hidden = !isPlaying;
};

const events = () => {

  const playButton = document.querySelector('.button-play');createPlayers
  
  const click$ = Rx.Observable.fromEvent(playButton, 'click');  
  const cancel$ = click$.mapTo(false); 
  const start$ = Rx.Observable.of(true, false).zip(Rx.Observable.timer(0, 3000), x => x );
  const play$ = click$.concatMap(() => start$.merge(cancel$)).take(2).do(isPlaying => isPlaying ? play() : stop());

  const subscribe = () => {
    play$.subscribe( {
      next: render,
      complete: subscribe
    });
  };

  subscribe();
};

const init = () => {
  isPlaying = false;
  window.onload = () => {
    events();
    render(false);
  };
};

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
                              .map(([key, _]) => key)
                              .repeat(20);
  
  const player$ = Rx.Observable.zip(namePlayer$, color$, (name, color) => createPlayer({name, color, numDices}))
                               .do(player => main.appendChild(player))
                               .subscribe();
};

const reset = () => {
  const main = document.querySelector('main');
  main.innerHTML = '';
};

const play = createPlayers;

const stop = reset;


init();