const render = (isPlaying = false) => {
  const playButton = document.querySelector('.button-play');
  const inputs = document.querySelectorAll('.mainboard input');
  const mainContainer = document.querySelector('.main-container');
  
  playButton.classList.toggle('playing', isPlaying);
  [].forEach.call(inputs, el => el.disabled = isPlaying);
  mainContainer.hidden = !isPlaying;
};

const events = () => {

  const playButton = document.querySelector('.button-play');
  
  const click$ = Rx.Observable.fromEvent(playButton, 'click');  
  const start$ = isPlaying => click$.mapTo(isPlaying).first();
  const play$ = start$(true).expand(isPlaying => start$(!isPlaying));
  
  play$.subscribe(isPlaying => isPlaying ? play() : stop());
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

const play = () => {
  createPlayers();
  const dices = document.getElementsByClassName("dice");
  [].forEach.call(dices, dice => dice.onclick = rollDice(dice));
  render(true);
  
};

const stop = () => {
    render(false);
    const dices = document.getElementsByClassName("dice");
    [].forEach.call(dices, dice => dice.onclick = undefined);
    reset();
};

init();