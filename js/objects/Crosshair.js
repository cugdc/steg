import Engine from '../Engine.js'
import Zombie from './Zombie.js'

const defaultColor = '#444'
const intersectionColor = '#fff'
const clickedColor = '#888'

const draw = function({ ctx }) {
  ctx.strokeStyle = this.color
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

const onMouseMove = function(eng, x, y) {
  this.x = x
  this.y = y

  if (Engine.intersectsAnyCollider(eng, x, y)) {
    this.color = intersectionColor
  } else {
    this.color = defaultColor
  }
}

const onMouseDown = function(eng, x, y) {
  this.color = clickedColor

  const p = Engine.getObject(eng, 'player')
  if (p.x < -1000) {
    p.x = x
    p.y = y
  } else {
    Engine.addObject(eng, Zombie(x, y))
  }
}

const onMouseUp = function(eng, x, y) {
  this.color = defaultColor
}

export default (x, y) => ({
  x,
  y,
  color: defaultColor,
  onMouseMove,
  onMouseDown,
  onMouseUp,
  draw
})
