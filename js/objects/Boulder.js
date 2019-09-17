import ConvexPoly from '../ConvexPoly.js'
import { strokeConvexPoly } from '../RenderUtils.js'

const draw = function({ ctx }) {
  ctx.lineWidth = 4
  ctx.strokeStyle = this.color
  strokeConvexPoly(ctx, this.shape)
}

const test = function(x, y) {
  if (ConvexPoly.contains(this.shape, [x, y])) {
    this.color = 'red'
  } else {
    this.color = 'green'
  }
}

export default (x, y, r, n) => ({
  shape: ConvexPoly.generate(x, y, r, n),
  color: 'green',
  draw,
  test
})
