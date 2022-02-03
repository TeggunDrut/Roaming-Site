const container = document.getElementById("container");
const mainmenu = document.getElementById("ui-mainmenu");
const mainmenuBtnPlay = document.getElementById("mainmenuBtnPlay");
const mainmenuBtnOptions = document.getElementById("mainmenuBtnOptions");
const mainmenuBtnExit = document.getElementById("mainmenuBtnExit");

let font = "30px Arial";

// game settings
let width = window.innerWidth;
let height = window.innerHeight;
// canvas
const gcanv = document.getElementById("galaxy");
const gctx = gcanv.getContext("2d");

let mouseX, mouseY;
let mouseDown = false;

const game = document.createElement("canvas");
game.width = width;
game.height = height;
game.setAttribute("style", "display: none;");
document.body.appendChild(game);
const ctx = game.getContext("2d");

let gameOpen = false;

let roundsStarted = false;
let roundNumber = 1;

let spawnPoints = [
  { x: 100, y: 700 },
  { x: 450, y: 150 },
  { x: 1300, y: 850 },
  { x: 1100, y: 200 },
  { x: 1560, y: 170 },
];

let fireloop;

let firing = false;

let bullets = [];

let keyState = {
  a: false,
  d: false,
  w: false,
  s: false,
  r: false,
};

let enemyList = [];

let check = setInterval(() => {
  if (gcanv.style.display == "none") {
    gameOpen = true;
    clearInterval(check);
  }
}, 10);

let firstShot = true;

// events
document.addEventListener("keydown", (e) => {
  keyState[e.key] = true;
  if (e.key == "Enter") {
    roundsStarted = true;
  }
  if (e.key == "l") {
    enemyList.push(
      new Enemy(
        Math.random() * game.width - 60,
        Math.random() * game.height - 60,
        60,
        60,
        "blue",
        100,
        true,
        1,
        100
      )
    );
  }
});
document.addEventListener("keyup", (e) => {
  keyState[e.key] = false;
});
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});
let iasdsa = 0;
document.addEventListener("mousedown", (e) => {
  iasdsa++;
  console.log(`iasds`, iasdsa);
  if (player.heldGun == "pistol") {
    player.rpm = 1500;
    player.maxShots = 7;
    player.damage = 34;
  } else if (player.heldGun == "assult rifle") {
    player.rpm = 150;
    player.maxShots = 30;
    player.damage = 28;
  }
  if (firstShot && player.heldGun.currentAmmo != 0) {
    player.heldGun.currentAmmo--;
    player.shoot(mouseX, mouseY);
    firstShot = false;
    setTimeout(function () { }, player.heldGun.rpm / 10);
  }

  mouseDown = true;
  fireloop = setInterval(() => {
    if (mouseDown == true && gameOpen) {
        if (!(player.heldGun.currentAmmo < 1)) {
          player.shoot(mouseX, mouseY);
          player.heldGun.currentAmmo--;
      }
      if (bullets.length > 200) {
        bullets.length = 10;
      }  
    }
  }, player.heldGun.rpm / 8);
});
document.addEventListener("mouseup", (e) => {
  mouseDown = false;
  clearInterval(fireloop);
  firing = false;
  firstShot = true;
});

let enemy = new Enemy(
  game.width / 2,
  game.height / 2,
  60,
  60,
  "blue",
  200,
  true,
  1,
  100
);
enemyList.push(enemy);
let fadeDiv = document.getElementById("fadeDiv");
let div = document.createElement("div");

let particles = [];
let count = 70;
let speed = 4;

function getDistance(xA, yA, xB, yB) {
  var xDiff = xA - xB;
  var yDiff = yA - yB;

  return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
function fadeOut(seconds) {
  let alpha = 0;

  setInterval(() => {
    if (alpha < 1) {
      alpha += 0.01 * seconds;
      div.setAttribute(
        "style",
        `width: 100%; height: 100%;background-color: rgba(0, 0, 0, ${alpha})`
      );
    }
  }, seconds * 10);
  fadeDiv.appendChild(div);
  return true;
}
function fadeIn(seconds) {
  let alpha = 1;

  setInterval(() => {
    if (alpha > 0) {
      alpha -= 0.01 * seconds;
      div.setAttribute(
        "style",
        `width: 100%; height: 100%;background-color: rgba(0, 0, 0, ${alpha})`
      );
    }
  }, seconds * 10);
  fadeDiv.appendChild(div);
  return true;
}
