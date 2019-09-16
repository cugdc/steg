import ConvexPoly from '../ConvexPoly.js'
import { strokeConvexPoly } from '../RenderUtils.js'

const draw = function({ ctx }) {
  ctx.lineWidth = 4
  ctx.strokeStyle = 'white'
  strokeConvexPoly(ctx, this.shape)
}

export default (x, y, r, n) => ({
  shape: ConvexPoly.generate(x, y, r, n),
  draw
})
