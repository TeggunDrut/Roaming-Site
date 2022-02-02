function init() {
  for (let i = 0; i < count + 1; i++) {
    particles.push({
      x: Math.floor(Math.random() * gcanv.width - 1),
      y: Math.floor(Math.random() * gcanv.height - 1),
      width: 2,
      height: 2,
      xvel: getRandomInt(-speed, speed),
      yvel: getRandomInt(-speed, speed),
    });
  }
}
function loop() {
  if (document.getElementById("fadeDiv").childElementCount < 1)
    document.getElementById("fadeDiv").style.display = "none";
  else document.getElementById("fadeDiv").style.display = "inline-block";
  gctx.clearRect(0, 0, gcanv.width, gcanv.height);
  particles.forEach((p) => {
    if (p.xvel == 0) p.xvel = getRandomInt(-speed, speed);
    else if (p.yvel == 0) p.yvel = getRandomInt(-speed, speed);
    gctx.fillStyle = "white";
    gctx.fillRect(p.x, p.y, p.width, p.height);

    p.x += p.xvel;
    p.y += p.yvel;

    if (p.x < 0) {
      p.x = gcanv.width;
      p.y = getRandomInt(0, gcanv.height);
    } else if (p.x > gcanv.width) {
      p.x = 0;
      p.y = getRandomInt(0, gcanv.height);
    }
    if (p.y < 0) {
      p.y = gcanv.height;
      p.x = getRandomInt(0, gcanv.width);
    } else if (p.y > gcanv.height) {
      p.y = 0;
      p.x = getRandomInt(0, gcanv.height);
    }

    particles.forEach((p2) => {
      if (getDistance(p.x, p.y, p2.x, p2.y) < 150) {
        let r = getDistance(p.x, p.y, p2.x, p2.y);
        gctx.beginPath();
        gctx.strokeStyle = `rgba(255, 255, 255, 0.1)`;
        gctx.moveTo(p.x, p.y);
        gctx.lineTo(p2.x, p2.y);
        gctx.stroke();
      }
    });
  });
}
window.onload = () => {
  init();
};
function startGame() {
  gcanv.style.display = "none";
  container.style.display = "none";

  game.style.display = "inline-block";
  // fadeDiv.removeChild(div);
  setInterval(gameLoop, 1);
}
function gameLoop() {
  // draw background
  ctx.clearRect(0, 0, game.width, game.height);
  ctx.fillStyle = "rgba(90, 90, 90, 0.6)";
  ctx.fillRect(0, 0, width, height);
  // draw grid
  ctx.beginPath();
  ctx.strokeStyle = "rgba(95, 95, 95, 0.9)";
  for (let xOff = 0; xOff < width; xOff += 70) {
    ctx.moveTo(xOff, 0);
    ctx.lineTo(xOff, height);
    ctx.stroke();
  }
  for (let yOff = 0; yOff < height; yOff += 70) {
    ctx.moveTo(0, yOff);
    ctx.lineTo(width, yOff);
    ctx.stroke();
  }
  ctx.stroke();

  // player update
  player.update();

  enemyList.forEach((e) => {
    e.update();
  });
}
