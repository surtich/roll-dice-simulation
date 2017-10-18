const createName = (namePlayer) => {
  const name = document.createElement('span');
  name.innerHTML = namePlayer;
  return name;
};

const createDices = (numDices) => {
  const container = document.createElement('div');
  container.className = 'dices-container';
  Array(numDices).fill().forEach(() => container.appendChild(createDice()));
  return container;
};


const createPlayer = ({color, name, numDices}) => {
  const player = document.createElement('div');
  player.className = `player ${color}-complementary border-${color}-complementary bg-${color}`;
  player.appendChild(createName(name));
  player.appendChild(createDices(numDices));
  return player;
};

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
