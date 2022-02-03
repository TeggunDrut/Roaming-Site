class Bullet {
  constructor(x, y, speed, mouseX, mouseY) {
    this.x = x;
    this.y = y;
    this.velX = 0;
    this.velY = 0;
    this.size = 4;
    this.speed = speed;
    this.mouseX = mouseX;
    this.mouseY = mouseY;
  }
  destroy() {
    for(let i = 0; i < bullets.length; i++) {
      if(bullets[i].x == this.x) {
        bullets.splice(i, 1);
      }
    }
  }
  loop() {
    
    this.x += this.velX;
    this.y += this.velY;

    enemyList.forEach((e) => {
      if (
        this.x <= e.x + e.width &&
        this.x >= e.x &&
        this.y <= e.y + e.height &&
        this.y >= e.y
      ) {
        e.currentHealth -= player.heldGun.damage;
        this.destroy();
      }
    });

    if (
      this.x + this.size < 0.0 ||
      this.x - this.size > game.width ||
      this.y + this.size < 0.0 ||
      this.y - this.size > game.height
    ) {
      this.destroy();
    }

    ctx.fillStyle = "yellow";
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
}

class Entity {
  Entity(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
}
class Enemy extends Entity {
  constructor(
    x,
    y,
    width,
    height,
    color,
    viewDistance,
    drawViewDistance,
    maxSpeed,
    maxHealth
  ) {
    super(
      x,
      y,
      width,
      height,
      color,
      viewDistance,
      drawViewDistance,
      maxSpeed,
      maxHealth
    );
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.viewDistance = viewDistance;
    this.drawViewDistance = drawViewDistance;
    this.maxSpeed = maxSpeed;
    this.maxHealth = maxHealth;

    this.currentHealth = this.maxHealth;
  }
  destroy() {
    for(let i = 0; i < enemyList.length; i++) {
      if(enemyList[i].x == this.x) {
        enemyList.splice(i, 1);
      }
    }    
  }
  draw() {
    // if (this.drawViewDistance) {
    //   ctx.strokeStyle = "rgba(0, 0, 0, 0.9)";
    //   ctx.lineWidth = 2;
    //   ctx.strokeRect(this.x - this.viewDistance, this.y - this.viewDistance, this.viewDistance * 2, this.viewDistance * 2);
    //   // console.log(this.x - this.radius, this.y - this.radius, this.radius + this.radius, this.radius + this.radius);
    // }

    // ctx.beginPath();
    ctx.fillStyle = this.color;
    // ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fill();

    if (!(this.health <= 0)) {
      ctx.fillStyle = "red";
      ctx.fillRect(
        this.x - this.width + 25,
        this.y - this.height + 25,
        this.width * 2 + 25 / 2,
        25
      );
      ctx.fillStyle = "green";
      ctx.fillRect(
        this.x - this.width + 25,
        this.y - this.height + 25,
        this.width * 2 + 25 / 2 - (this.maxHealth - this.currentHealth),
        25
      );
    } else {
      enemyList.shift(enemyList.indexOf(this));
    }
  }
  targetPlayer() {
    if (
      player.x + player.width >= this.x - this.width - this.viewDistance &&
      player.x <= this.x + this.width + this.viewDistance &&
      player.y + player.height >= this.y - this.height - this.viewDistance &&
      player.y <= this.y + this.height + this.viewDistance
    ) {
      if (player.x + player.width <= this.x) {
        this.x -= this.maxSpeed;
      } else if (player.x > this.x) {
        this.x += this.maxSpeed;
      }
      if (player.y + player.height <= this.y) {
        this.y -= this.maxSpeed;
      } else if (player.y > this.y) {
        this.y += this.maxSpeed;
      }
    }
    if (this.drawViewDistance) {
      ctx.beginPath();
      ctx.strokeStyle = "red";
      ctx.fillStyle = "red";
      ctx.arc(
        this.x + this.radius + this.viewDistance,
        this.y - this.radius - this.viewDistance,
        0,
        0,
        Math.PI * 2
      );
      ctx.arc(
        this.x - this.radius - this.viewDistance,
        this.y - this.radius - this.viewDistance,
        0,
        0,
        Math.PI * 2
      );
      ctx.arc(
        this.x - this.radius - this.viewDistance,
        this.y + this.radius + this.viewDistance,
        0,
        0,
        Math.PI * 2
      );
      ctx.arc(
        this.x + this.radius + this.viewDistance,
        this.y + this.radius + this.viewDistance,
        0,
        0,
        Math.PI * 2
      );
      ctx.arc(
        this.x + this.radius + this.viewDistance,
        this.y - this.radius - this.viewDistance,
        0,
        0,
        Math.PI * 2
      );
      ctx.stroke();
    }
  }
  update() {
    if (this.currentHealth <= 0) {
      this.destroy();
    }
    this.draw();
    this.targetPlayer();
  }
}
