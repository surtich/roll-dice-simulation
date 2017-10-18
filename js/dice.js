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

const rollDice = (dice) => () => {

  const faces = dice.getElementsByClassName("dice-face");

  for(let fIt = 0; fIt < faces.length; fIt++) {
    faces[fIt].style.backgroundColor = "white";
  }

  const randFace = Math.floor(Math.random() * 6);

  dice.style.transform = "rotate3d(1, 0, 0, " + Math.random() * 360 +  "deg) rotate3d(0, 1, 0, " + Math.random() * 360 +  "deg) rotate3d(0, 0, 1, " + Math.random() * 360 +  "deg)";

  setTimeout( () => {
    dice.style.transform = faceRot[randFace];
    dice.getElementsByClassName("dice-face")[randFace].style.backgroundColor = "green";
  }, Math.floor(Math.random() * 1000 + 500));
}
