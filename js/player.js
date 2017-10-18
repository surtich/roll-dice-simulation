const createName = (namePlayer, color, parent) => {
  const name = document.createElement('button');
  name.className = `${color}-complementary border-${color}-complementary bg-${color}`; 
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
  const nameButton = createName(name, color);  
  player.appendChild(nameButton);
  const dices = createDices(numDices);
  nameButton.onclick = () => {
    const dices = player.getElementsByClassName("dice");
    nameButton.disabled = true;
    const dice$ = Rx.Observable.from(dices);
    const random$ = (from, to) => Rx.Observable.of(null)
                                               .map( () => Math.floor(Math.random() * to + from))
                                               .repeat()
                                               .take(dices.length);
    
        
    const rollDice$ = Rx.Observable.zip(dice$, random$(0, 6), (dice, randFace) =>  ({dice, randFace, time: Math.floor(Math.random() * 1000 + 500)}))
    const rollDiceMulticast$ = new Rx.Subject();    
    
    rollDiceMulticast$.subscribe(rollDice);
    
    rollDiceMulticast$.toArray().subscribe(xs => {
      const hasWon = won(xs.map(({randFace}) => randFace));
      xs.forEach( ({dice, randFace}) => addFaceDiceClass({dice, randFace, className: hasWon ? 'win' : 'lost', time: 3000 }));
    });                 

    rollDice$.subscribe(rollDiceMulticast$);
  };
  
  player.appendChild(dices);
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
