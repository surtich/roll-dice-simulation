//code based on: https://codepen.io/SuperJinx/pen/kXjgVQ

const createFace = () => {
  const face = document.createElement('div');
  face.className = 'dice-face';
  return face;
};

const createDice = () => {
  const dice = document.createElement('div');
  dice.className = 'dice';
  Array(6).fill().forEach(() => dice.appendChild(createFace()));
  const container = document.createElement('div');
  container.className = 'dice-container';
  container.appendChild(dice);
  return container;
};

const faceRot = [
  "rotate3d(0, 0, 1, -90deg)",
  "rotate3d(1, 0, 0, 180deg)",
  "rotate3d(1, 0, 0, 90deg)",
  "rotate3d(1, 0, 0, -90deg)",
  "rotate3d(0, 1, 0, -90deg)",
  "rotate3d(0, 1, 0, 90deg)"
];

const rollDice = ({dice, randFace, time, selected = true}) => {

  const faces = dice.getElementsByClassName("dice-face");

  for(let fIt = 0; fIt < faces.length; fIt++) {
    faces[fIt].classList.toggle('selected', false);
    faces[fIt].classList.toggle('win', false);
    faces[fIt].classList.toggle('lost', false);
  }

  dice.style.transform = "rotate3d(1, 0, 0, " + Math.random() * 360 +  "deg) rotate3d(0, 1, 0, " + Math.random() * 360 +  "deg) rotate3d(0, 0, 1, " + Math.random() * 360 +  "deg)";
  selected && addFaceDiceClass({dice, randFace, className: 'selected', time});  
};

const addFaceDiceClass = ({dice, randFace, className, time}) => {
  setTimeout( () => {
    dice.style.transform = faceRot[randFace];
    const face = dice.getElementsByClassName("dice-face")[randFace];
    face.classList.toggle(className, true);
  }, time);
};
