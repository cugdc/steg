import { drawLife } from '../RenderUtils.js'

const draw = function({ ctx }) {
  drawLife(ctx, this.x, this.y, this.rot, '#707')
}

const update = function(eng) {
  // TODO: player controlled by mouse and directional keys
}

export default (x, y) => ({
  x,
  y,
  draw,
  human: true
})
