class Game {
	constructor(canvas, ctx) {
		this.cnv = canvas
		this.ctx = ctx
		this.player = new Player(this)
		this.weapon = new Weapon(this.player, this.cnv)

		this.enemies = []
		this.bullets = []

		this.crosshair = new Image()
		this.crosshair.src = '../sprites/crosshair.png'

		this.currentState = 'RUN'

		this.score = 0
		this.newRecord = false
		this.reload = false

		window.addEventListener('keydown', (e) => {
			console.log(e.key)
			switch (e.key) {
				case 'w':
					this.player.direction.up = true
					break
				case 's':
					this.player.direction.down = true
					break
				case 'a':
					this.player.direction.left = true
					// this.flip = true
					break
				case 'd':
					this.player.direction.right = true
					// this.flip = false
					break

				case 'Enter':
					this.currentState = this.currentState === 'RUN' ? 'PAUSE' : 'RUN'
					break

				case ' ':
					if (this.reload) {
						window.location.reload()
					}
					break
			}
		})

		window.addEventListener('keyup', (e) => {
			switch (e.key) {
				case 'w':
					this.player.direction.up = false
					break
				case 's':
					this.player.direction.down = false
					break
				case 'a':
					this.player.direction.left = false
					break
				case 'd':
					this.player.direction.right = false
					break
			}
		})

		this.cnv.addEventListener('mousedown', (e) => {
			this.bullets.push(
				new Bullet(
					this.weapon.centerX() + Math.cos(this.weapon.rotation) * 50,
					this.weapon.centerY() + Math.sin(this.weapon.rotation) * 50,
					this.weapon.rotation,
				),
			)
			this.weapon.fireFree = true
			console.log(this.bullets)
		})
	}

	run() {
		// desenhando e atualizando o player
		this.player.draw(this.ctx)
		this.player.update()

		// criando os inimigos
		if (Math.random() < 0.02) {
			let posX,
				posY,
				offset = 100
			if (Math.random() < 0.5) {
				posX = Math.random() < 0.5 ? 0 - offset : this.cnv.width + offset
				posY = Math.random() * this.cnv.height
			} else {
				posX = Math.random() * this.cnv.width
				posY = Math.random() < 0.5 ? 0 - offset : this.cnv.height + offset
			}
			const speed = 1 + Math.random() * 2
			if (this.enemies.length < 5) {
				this.enemies.push(new Enemy(posX, posY, speed))
			}
		}

		// desenhando e atualizando os inimigos
		for (let enemy of this.enemies) {
			enemy.draw(this.ctx)
			enemy.update(this.player)
		}

		// desenhando e atualizando a arma
		this.weapon.draw(this.ctx)
		this.weapon.update()

		// desenhando e atualizando os tiros
		for (let bullet of this.bullets) {
			bullet.draw(this.ctx)
			bullet.update()

			if (
				bullet.x < 0 ||
				bullet.x > this.cnv.width ||
				bullet.y < 0 ||
				bullet.y > this.cnv.height
			) {
				this.bullets.splice(bullet, 1)
			}
		}

		// verificar colisão do tiro com o inimigo
		for (let i = this.bullets.length - 1; i >= 0; i--) {
			const bullet = this.bullets[i]
			for (let c = this.enemies.length - 1; c >= 0; c--) {
				const enemy = this.enemies[c]
				if (checkCollision(bullet, enemy)) {
					enemy.hp -= this.weapon.damage
					if (enemy.hp <= 0) {
						this.enemies.splice(c, 1)
						this.score += 5
					} else {
						enemy.setOpacity()
						this.score += 1
					}
					this.bullets.splice(i, 1)
				}
			}
		}

		for (let enemy of this.enemies) {
			if (checkCollision(this.player, enemy)) {
				this.player.hp -= 0.05

				if (this.player.hp < 0) {
					this.currentState = 'GAMEOVER'
				}
			}
		}

		if (this.crosshair.complete) {
			// crosshair
			this.ctx.drawImage(
				this.crosshair,
				this.weapon.mousePos.x - this.crosshair.width / 2,
				this.weapon.mousePos.y - this.crosshair.height / 2,
			)
		}

		this.ctx.font = '20px Arial'
		this.ctx.fillStyle = '#fff'
		this.ctx.fillText(`Score: ${this.score}`, 10, 80)
	}

	pause() {
		this.ctx.fillStyle = 'rgba(0,0,0,0.1)'
		this.ctx.fillRect(0, 0, this.cnv.width, this.cnv.height)
		this.ctx.font = '80px Arial'
		this.ctx.textAlign = 'center'
		this.ctx.fillStyle = '#fff'
		this.ctx.fillText('PAUSED', this.cnv.width / 2, this.cnv.height / 2 - 100)
		this.ctx.font = '40px Arial'
		this.ctx.fillText('Press Enter to continue', this.cnv.width / 2, this.cnv.height / 2)
	}

	gameOver() {
		this.ctx.fillStyle = 'rgba(0,0,0,0.1)'
		this.ctx.fillRect(0, 0, this.cnv.width, this.cnv.height)
		this.ctx.font = '80px Arial'
		this.ctx.textAlign = 'center'
		this.ctx.fillStyle = '#fff'
		this.ctx.fillText('GAME OVER', this.cnv.width / 2, this.cnv.height / 2 - 100)
		this.ctx.font = '40px Arial'
		this.ctx.fillText(
			'Press Space to try again',
			this.cnv.width / 2,
			this.cnv.height / 2 + 100,
		)

		this.enemies = []
		this.bullets = []

		const newRecord = localStorage.getItem('newRecord')

		if (newRecord !== null) {
			if (this.score > newRecord) {
				localStorage.setItem('newRecord', JSON.stringify(this.score))
				this.newRecord = true
			}
		} else {
			localStorage.setItem('newRecord', JSON.stringify(this.score))
		}

		if (this.newRecord) {
			this.ctx.font = '60px Arial'
			this.ctx.fillStyle = '#fff'
			this.ctx.fillText(
				`New Record: ${this.score}`,
				this.cnv.width / 2,
				this.cnv.height / 2,
			)
		}

		this.reload = true
	}
}
