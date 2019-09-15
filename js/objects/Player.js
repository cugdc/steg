import { drawLife } from '../RenderUtils.js'

const draw = function({ ctx }) {
  drawLife(ctx, this.x, this.y, this.rot, '#707', '#a7a')
}

const update = function(eng) {
  this.rot += this.rotSpeed
  this.x += this.speed * Math.cos(this.rot)
  this.y += this.speed * Math.sin(this.rot)
}

const setSpeed = function(speed) {
  this.speed = speed
}

const setRotSpeed = function(speed) {
  this.rotSpeed = speed
}

export default (x, y) => ({
  x,
  y,
  rot: Math.random() * Math.PI * 2,
  speed: 0,
  rotSpeed: 0,
  draw,
  update,
  setSpeed,
  setRotSpeed,
  human: true
})
