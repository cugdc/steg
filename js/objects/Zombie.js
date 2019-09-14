const draw = function({ ctx, elapsed }) {
  const { x, y } = this
  ctx.fillStyle = '#696'

  ctx.beginPath()
  ctx.arc(x, y, 15, 0, 2 * Math.PI)
  ctx.fill()

  this.x += 5 * Math.sin(elapsed / 300)
  this.y += 5 * Math.cos(elapsed / 300)
}

export default (x, y) => ({ x, y, draw })
