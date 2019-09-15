import { drawLife } from '../RenderUtils.js'

const draw = function({ ctx }) {
  drawLife(ctx, this.x, this.y, this.rot, '#707', '#a7a')
}

const update = function(eng) {
  // TODO: player controlled by mouse and directional keys
  this.rot += 0.1
}

export default (x, y) => ({
  x,
  y,
  rot: Math.random() * Math.PI * 2,
  draw,
  update,
  human: true
})
