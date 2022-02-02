class Entity {
  Entity(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
}
class Enemy extends Entity {
  constructor(x, y, radius, color, viewDistance, drawViewDistance, maxSpeed) {
    super(x, y, radius, color, viewDistance, drawViewDistance, maxSpeed);
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.viewDistance = viewDistance;
    this.drawViewDistance = drawViewDistance;
    this.maxSpeed = maxSpeed;
  }
  draw() {
    // if (this.drawViewDistance) {
    //   ctx.strokeStyle = "rgba(0, 0, 0, 0.9)";
    //   ctx.lineWidth = 2;
    //   ctx.strokeRect(this.x - this.viewDistance, this.y - this.viewDistance, this.viewDistance * 2, this.viewDistance * 2);
    //   // console.log(this.x - this.radius, this.y - this.radius, this.radius + this.radius, this.radius + this.radius);
    // }

    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
  targetPlayer() {
    if (
      player.x + player.width >= (this.x - this.radius - this.viewDistance)
      &&
      player.x <= (this.x + this.radius + this.viewDistance) &&
      player.y + player.height >= (this.y - this.radius - this.viewDistance) &&
      player.y <= (this.y + this.radius + this.viewDistance)
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
      ctx.arc(this.x + this.radius + this.viewDistance, this.y - this.radius - this.viewDistance, 0, 0, Math.PI * 2);
      ctx.arc(this.x - this.radius - this.viewDistance, this.y - this.radius - this.viewDistance, 0, 0, Math.PI * 2);
      ctx.arc(this.x - this.radius - this.viewDistance, this.y + this.radius + this.viewDistance, 0, 0, Math.PI * 2);
      ctx.arc(this.x + this.radius + this.viewDistance, this.y + this.radius + this.viewDistance, 0, 0, Math.PI * 2);
      ctx.arc(this.x + this.radius + this.viewDistance, this.y - this.radius - this.viewDistance, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
  update() {
    this.targetPlayer();
    this.draw();
  }
}
