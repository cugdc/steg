import Engine from '../Engine.js'

const draw = function({ ctx }) {
  ctx.strokeStyle = '#444'
  ctx.lineWidth = 1

  ctx.beginPath()
  ctx.moveTo(this.x - 10, this.y)
  ctx.lineTo(this.x + 10, this.y)
  ctx.closePath()
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(this.x, this.y - 10)
  ctx.lineTo(this.x, this.y + 10)
  ctx.closePath()
  ctx.stroke()
}

const onMouseMove = function(x, y) {
  this.x = x
  this.y = y
}

export default (x, y) => ({
  x,
  y,
  onMouseMove,
  draw
})
