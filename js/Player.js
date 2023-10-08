class Player {
	constructor(game) {
		this.game = game
		this.sprites = {
			idle: '../sprites/player/idle.png',
			run: '../sprites/player/run.png',
		}
		this.x = this.game.cnv.width / 2
		this.y = this.game.cnv.height / 2
		this.width = 70
		this.height = 91
		this.sourceX = 0

		this.image = new Image()
		this.image.src = this.sprites.idle
		this.image.onload = () => {
			this.qntFrame = this.image.width / this.width
		}

		this.frameSpeed = 6
		this.color = '#00f'
		this.speed = 5
		this.direction = {
			left: false,
			right: false,
			up: false,
			down: false,
		}
		this.aniCount = 0
		this.flip = false

		this.hp = 20
		this.maxLife = 20
	}

	move() {
		if (this.direction.up) this.y -= this.speed
		if (this.direction.down) this.y += this.speed
		if (this.direction.left) this.x -= this.speed
		if (this.direction.right) this.x += this.speed
	}

	animation() {
		if (
			!this.direction.down &&
			!this.direction.up &&
			!this.direction.left &&
			!this.direction.right
		) {
			this.image.src = this.sprites.idle
		} else {
			this.image.src = this.sprites.run
		}
		this.aniCount++

		if (this.aniCount >= this.qntFrame * this.frameSpeed) {
			this.aniCount = 0
		}

		this.sourceX = Math.floor(this.aniCount / this.frameSpeed) * this.width
	}

	showHp(ctx) {
		ctx.fillStyle = 'green'
		ctx.fillRect(10, 20, (this.hp / this.maxLife) * 200, 30)

		ctx.strokeStyle = 'black'
		ctx.strokeRect(10, 20, 200, 30)
	}

	draw(ctx) {
		if (this.image.complete) {
			if (this.flip) {
				ctx.save()
				ctx.scale(-1, 1)
				ctx.drawImage(
					this.image,
					this.sourceX,
					0,
					this.width,
					this.height,
					-this.x - this.width,
					this.y,
					this.width,
					this.height,
				)
				ctx.restore()
			} else {
				ctx.drawImage(
					this.image,
					this.sourceX,
					0,
					this.width,
					this.height,
					this.x,
					this.y,
					this.width,
					this.height,
				)
			}
		}

		this.showHp(ctx)
	}

	update() {
		this.move()
		this.animation()

		// evitar que o personagem nao saia da tela
		this.x = Math.max(0, Math.min(this.game.cnv.width - this.width, this.x))
		this.y = Math.max(0, Math.min(this.game.cnv.height - this.height, this.y))
	}
}

// 560
// 730
// 745
// 1050
