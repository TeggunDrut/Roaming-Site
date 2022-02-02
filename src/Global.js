const container = document.getElementById("container");
const mainmenu = document.getElementById("ui-mainmenu");
const mainmenuBtnPlay = document.getElementById("mainmenuBtnPlay");
const mainmenuBtnOptions = document.getElementById("mainmenuBtnOptions");
const mainmenuBtnExit = document.getElementById("mainmenuBtnExit");
// game settings
let width = window.innerWidth;
let height = window.innerHeight;
// canvas
const gcanv = document.getElementById("galaxy");
const gctx = gcanv.getContext("2d");

let mouseX, mouseY;

const game = document.createElement("canvas");
game.width = width;
game.height = height;
game.setAttribute("style", "display: none;");
document.body.appendChild(game);
const ctx = game.getContext("2d");

let enemyList = [];

// events
document.addEventListener("keydown", (e) => {
  keyState[e.key] = true;
});
document.addEventListener("keyup", (e) => {
  keyState[e.key] = false;
});
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

let keyState = {
  a: false,
  d: false,
  w: false,
  s: false,
};

let player = {
  x: 0,
  y: 0,
  speed: 2,
  xVel: 1,
  yVel: 1,
  width: 35,
  height: 35,
  heldGun: "pistol",
  update: function () {
    ctx.fillStyle = "black";
    ctx.fillRect(this.x, this.y, this.width, this.height);

    if (this.x < 0) {
      this.x = 0;
    } else if (this.x + this.width > width) {
      this.x = width - this.width;
    }
    if (this.y < 1) {
      this.y = 0;
    } else if (this.y + this.height > height) {
      this.y = height - this.height;
    }

    if (keyState.d) {
      this.x += this.speed;
    }
    if (keyState.a) {
      this.x -= this.speed;
    }
    if (keyState.w) {
      this.y -= this.speed;
    } else if (keyState.s) {
      this.y += this.speed;
    }
    
  },
};

let enemy = new Enemy(
  game.width / 2,
  game.height / 2,
  60,
  "blue",
  200,
  true,
  1
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
