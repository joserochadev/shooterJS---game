class Bullet {
  constructor(x, y, angle) {
    this.x = x
    this.y = y
    this.width = 8
    this.height = 8
    this.angle = angle
    this.speed = 20
    this.color = '#ff0'
  }

  draw(ctx) {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }

  update() {
    this.x += Math.cos(this.angle) * this.speed
    this.y += Math.sin(this.angle) * this.speed
  }
}
