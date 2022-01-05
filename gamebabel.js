// ===== Criar o canvas
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// ===== imagem de fundo
let bgReady = false;
const bgImage = new Image();
bgImage.onload = function () {
  bgReady = true;
};
bgImage.src = "images/background.png";

// ===== Imagem de heroi
let heroReady = false;
const heroImage = new Image();
heroImage.onload = function () {
  heroReady = true;
};
heroImage.src = "images/hero.png";

//  ===== Image de monstro
let monsterReady = false;
const monsterImage = new Image();
monsterImage.onload = function () {
  monsterReady = true;
};
monsterImage.src = "images/monster.png";

//Objetos do jogo
const hero = {
  speed: 256, //Movimento em pixels por segundo
};

const monster = {};
let monstersCaught = 0; //Contagem de monstros

//Controle do teclado
const keysDown = {};

window.addEventListener(
  "keydown",
  function (e) {
    console.log(e);
    keysDown[e.keyCode] = true;
  },
  false
);

window.addEventListener(
  "keyup",
  function (e) {
    delete keysDown[e.keyCode];
  },
  false
);

// Reseta o jogo ao pegar o monstro
const reset = function () {
  hero.x = canvas.width / 2;
  hero.y = canvas.height / 2;

  //Posicionando o monstro
  monster.x = 32 + Math.random() * (canvas.width - 64);
  monster.y = 32 + Math.random() * (canvas.width - 64);
};

//Atualiza os objetos do jogo
const update = function (modifier) {
  if (38 in keysDown) {
    // 38  = seta para cima
    hero.y -= hero.speed * modifier;
  }
  if (40 in keysDown) {
    // 40 = seta para baixo
    hero.y += hero.speed * modifier;
  }

  if (37 in keysDown) {
    // 37 = seta para esquerda
    hero.x -= hero.speed * modifier;
  }
  if (39 in keysDown) {
    // 39 seta para direita
    hero.x += hero.speed * modifier;
  }

  //os personagens se encostaram?
  if (
    hero.x <= monster.x + 32 &&
    monster.x <= hero.x + 32 &&
    hero.y <= monster.y + 32 &&
    monster.y <= hero.y + 32
  ) {
    ++monstersCaught;
    reset();
  }
};

//Renderiza tudo
const render = function () {
  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }

  if (heroReady) {
    ctx.drawImage(heroImage, hero.x, hero.y);
  }

  if (monsterReady) {
    ctx.drawImage(monsterImage, monster.x, monster.y);
  }

  //Pontuação
  ctx.fillStyle = "rgb(250,250,250)";
  ctx.font = "24 Helvetica";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("Monstros pegos: " + monstersCaught, 32, 32);
};

// Controla o loop do jogo
const main = function () {
  const now = Date.now();
  const delta = now - then;

  update(delta / 1000);
  render();

  then = now;

  requestAnimationFrame(main);
};

const w = window;
const requestAnimationFrame =
  w.requestAnimationFrame ||
  w.webkitRequestAnimationFrame ||
  w.msRequestAnimationFrame ||
  w.mozRequestAnimationFrame;

let then = Date.now();
reset();
main();
