import ConvexPoly from '../ConvexPoly.js'
import { createConvexPolyPath } from '../RenderUtils.js'

const draw = function({ ctx }) {
  createConvexPolyPath(ctx, this.collider)

  ctx.lineWidth = 4
  ctx.strokeStyle = '#e77'
  ctx.stroke()

  ctx.fillStyle = '#930'
  ctx.fill()
}

export default (x, y, r, n) => ({
  collider: ConvexPoly.random(x, y, r, n),
  draw
})
