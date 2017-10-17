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
  window.onload = () => {
    events();
    render(false);
  };
};

const reset = () => {
  const main = document.querySelector('main');
  main.innerHTML = '';
};

const play = createPlayers;

const stop = reset;

init();