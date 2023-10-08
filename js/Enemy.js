class Enemy {
	constructor(x, y, speed) {
		this.x = x
		this.y = y
		this.speed = speed
		this.width = 73.5
		this.height = 122
		this.sourceX = 0
		this.flip = false
		this.frameSpeed = 6
		this.aniCount = 0
		this.sprites = {
			run: '../sprites/enemies/char1/run.png',
		}
		this.image = new Image()
		this.image.src = this.sprites.run
		this.image.onload = () => {
			this.qntFrame = this.image.width / this.width
		}
		this.opacity = 1
		this.blink = false

		this.hp = (Math.floor(Math.random() * 6) + 2) * 10
		this.maxLife = this.hp
	}

	animation() {
		this.aniCount++

		if (this.aniCount >= this.qntFrame * this.frameSpeed) {
			this.aniCount = 0
		}

		this.sourceX = Math.floor(this.aniCount / this.frameSpeed) * this.width
	}

	showHp(ctx) {
		ctx.fillStyle = 'green'
		ctx.fillRect(this.x, this.y, (this.hp / this.maxLife) * 50, 5)

		ctx.strokeStyle = 'black'
		ctx.strokeRect(this.x, this.y, 50, 5)
	}

	setOpacity() {
		if (!this.blink) {
			this.blink = true

			let interval = setInterval(() => {
				this.opacity = this.opacity === 0 ? 1 : 0
			}, 100)

			setTimeout(() => {
				clearInterval(interval)
				this.blink = false
				this.opacity = 1
			}, 1000)
		}
	}

	draw(ctx) {
		if (this.flip) {
			ctx.save()
			ctx.globalAlpha = this.opacity
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
			ctx.save()
			ctx.globalAlpha = this.opacity
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
			ctx.restore()
		}
		ctx.globalAlpha = 1
		// ctx.strokeRect(this.x, this.y, this.width, this.height)

		this.showHp(ctx)
	}

	update(player) {
		const deltaX = player.x - this.x
		const deltaY = player.y - this.y
		const angle = Math.atan2(deltaY, deltaX)

		this.x += Math.cos(angle) * this.speed
		this.y += Math.sin(angle) * this.speed

		this.animation()

		if (this.x > player.x) {
			this.flip = true
		} else {
			this.flip = false
		}
	}
}

// 653
// 899
// 673
// 886
