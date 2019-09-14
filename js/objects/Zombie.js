const draw = function({ ctx, updates }) {
  const { x, y } = this
  ctx.fillStyle = '#696'

  ctx.beginPath()
  ctx.arc(x, y, 15, 0, 2 * Math.PI)
  ctx.fill()
}

const update = function({ updates }) {
  this.x += 5 * Math.sin(updates / 30)
  this.y += 5 * Math.cos(updates / 30)
}

export default (x, y) => ({ x, y, draw, update })
