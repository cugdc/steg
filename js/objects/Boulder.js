import ConvexPoly from '../ConvexPoly.js'
import { createConvexPolyPath } from '../RenderUtils.js'

const draw = function({ ctx }) {
  ctx.lineWidth = 4
  ctx.strokeStyle = '#a33'
  ctx.fillStyle = '#930'
  createConvexPolyPath(ctx, this.collider)
  ctx.fill()
}

export default (x, y, r, n) => ({
  collider: ConvexPoly.random(x, y, r, n),
  draw
})
