class Weapon {
	constructor(player, canvas) {
		this.player = player
		this.cnv = canvas
		// weapon image
		this.image = new Image()
		this.image.src = '../sprites/weapon/weaponR1.png'
		this.image.onload = () => {
			this.width = this.image.width
			this.height = this.image.height
			this.x = this.player.x + (this.player.width / 2 - this.width / 2)
			this.y = this.player.y + (this.player.height / 2 - this.height / 2) + 50
		}

		// fire image
		this.fireImage = new Image()
		this.fireImage.src = '../sprites/muzzle.png'
		this.fireImage.onload = () => {
			this.fireWidth = this.fireImage.width
			this.fireheight = this.fireImage.height
		}
		this.fireTime = 0
		this.fireFree = false
		this.damage = 10

		this.color = '#f00'
		this.rotation = 0
		this.mousePos = {}
		this.flip = false

		// pegando posição do mouse
		this.cnv.addEventListener('mousemove', (e) => {
			this.mousePos.x = e.clientX - this.cnv.offsetLeft
			this.mousePos.y = e.clientY - this.cnv.offsetTop
		})
	}

	centerX() {
		return this.x + this.width / 2
	}
	centerY() {
		return this.y + this.height / 2
	}

	draw(ctx) {
		ctx.save()
		ctx.translate(this.centerX(), this.centerY())
		ctx.rotate(this.rotation)
		ctx.fillStyle = this.color
		if (this.flip) {
			ctx.scale(1, -1)
		}
		ctx.drawImage(
			this.image,
			0,
			0,
			this.width,
			this.height,
			-this.width / 2,
			-this.height / 2,
			this.width,
			this.height,
		)
		ctx.restore()

		// draw fire shot
		if (this.fireFree) {
			ctx.save()
			ctx.translate(this.centerX(), this.centerY())
			ctx.rotate(this.rotation)
			ctx.drawImage(
				this.fireImage,
				0,
				0,
				this.fireWidth,
				this.fireheight,
				-this.width / 2 + 90,
				-this.height / 2,
				this.width,
				this.height,
			)
			ctx.restore()
		}

		if (this.rotation >= 1.55 || this.rotation <= -1.55) {
			this.player.flip = true
			this.flip = true
		} else {
			this.player.flip = false
			this.flip = false
		}
	}

	update() {
		this.x = this.player.x + (this.player.width / 2 - this.width / 2)
		this.y = this.player.y + (this.player.height / 2 - this.height / 2) + 20

		this.rotation = Math.atan2(
			this.mousePos.y - this.centerY(),
			this.mousePos.x - this.centerX(),
		)

		if (this.fireFree && this.fireTime < 10) {
			this.fireTime += 1.2
		} else {
			this.fireFree = false
			this.fireTime = 0
		}
	}
}

// 435
// 761
// 809
// 1019
