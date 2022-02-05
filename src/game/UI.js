
let animLoop = setInterval(() => {
  
}, 10)
function drawUI() {
  ctx.font = "40px sans-serif";
  ctx.fillStyle = "rgb(110, 255, 110)";
  ctx.fillText(player.health + " ", 10, game.height - 20);
  ctx.font = "35px sans-serif";

  ctx.fillText("Kills: " + player.killCount + " ", 200, game.height - 25);

  ctx.fillStyle = "rgb(240, 240, 240)";
  ctx.fillText(player.heldGun.currentAmmo + " / " + player.heldGun.maxAmmo, game.width -  1.2*110, game.height - 20);

  if (player.heldGun.currentAmmo < 1) {
    ctx.fillStyle = "white";
    ctx.fillText("Reload", game.width / 2, game.height - 200);
  }
  
  ctx.fillText(player.heldGun.name, game.width - 100, game.height - 100)
  
}
