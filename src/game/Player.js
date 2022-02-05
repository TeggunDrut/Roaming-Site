let looper = 0;
let animation = false;
let progress = 0;

let assultRifle = { name: "assault rifle", currentAmmo: 30, maxAmmo: 30, rpm: 1500, damage: 24 };
let pistol = {name: "pistol", currentAmmo: 7, maxAmmo: 7, rpm: 3000, damage: 39}
let player = {
  x: 0,
  y: 0,
  speed: 2,
  xVel: 1,
  yVel: 1,
  width: 35,
  height: 35,
  health: 100,
  heldGun: assultRifle,
  bulletSpeed: 7,
  maxShots: 0,
  rpm: 0,
  reloading: false,
  killCount: 0,
  shoot: function (mouseX, mouseY) {

    let bullet = new Bullet(this, this.x, this.y, 2, mouseX, mouseY);
    var x = mouseX - player.x;
    var y = mouseY - player.y;
    var l = Math.sqrt(x * x + y * y);
    x = x / l;
    y = y / l;

    // Reset bullet position
    bullet.x = player.x + this.width / 2;
    bullet.y = player.y + this.height / 2;

    // Get the bullet to travel towards the mouse pos with a new speed of 10.0 (you can change this)
    bullet.velX = x * this.bulletSpeed;
    bullet.velY = y * this.bulletSpeed;
    
    bullets.push(bullet);
  },
  update: function () {

    if(this.health <= 0) {
      this.health = 1;
      gameOpen = false;
      gameLoop = 0;
      gameOver();
    }

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

    bullets.forEach((b) => {
      b.loop();
    });
    if (keyState.r == true && player.heldGun.currentAmmo < this.heldGun.maxAmmo) {
      if (this.heldGun.currentAmmo == this.heldGun.maxAmmo) {
        
      } else {
        if (progress == 0) {
          console.log(`'asd`, 'asd');
          keyState.r = false;
          this.reloading = true;
          looper = 0;
          progress = 0;
        }
          
      }
    }

    if (animation) {
      looper++;
      progress++;
      ctx.fillStyle = "red";
      ctx.fillRect(game.width / 2 - 50, game.height - 130, progress * 1.2, 20);
    }
    if (this.reloading) {
      animation = true;
      if (looper > 150) {
        animation = false;
        this.reloading = false;
        this.heldGun.currentAmmo = this.heldGun.maxAmmo;
        progress = 0;
      }
    } else {
      animation = false;
    }
    
    drawUI();
  },
};