
let animLoop = setInterval(() => {
  
}, 10)
function drawUI() {
  ctx.font = "30px sans-serif";
  ctx.fillStyle = "rgb(110, 255, 110)";
  ctx.fillText(player.health + " ",10, game.height - 20);

  ctx.fillStyle = "rgb(240, 240, 240)";
  ctx.fillText(player.heldGun.currentAmmo + " / " + player.heldGun.maxAmmo, game.width - 100, game.height - 20);

  if (player.heldGun.currentAmmo < 1) {
    ctx.fillStyle = "white";
    ctx.fillText("Reload", game.width / 2, game.height - 200);


  }
  
}
