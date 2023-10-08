function debug(text, pos = 1) {
  /** @type {HTMLCanvasElement} */
  const cnv = document.querySelector('#cnv')
  const ctx = cnv.getContext('2d')
  ctx.font = '24px Arial'
  ctx.fillStyle = '#fff'
  ctx.fillText(text, 10, 30 * pos)
}
