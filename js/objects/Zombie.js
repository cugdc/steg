import Engine from '../Engine.js'
import Triangle from '../Triangle.js'
import ConvexPoly from '../ConvexPoly.js'
import { drawLife, drawTriangle, createConvexPolyPath } from '../RenderUtils.js'

const DRAW_LOOK_TRI = false
const DRAW_COLLIDER = false

const draw = function({ ctx, updates }) {
  const { x, y, rot } = this

  if (DRAW_LOOK_TRI) {
    const c = () => (this.aggro ? '#f00' : '#ccc')
    drawTriangle(ctx, this.look, c)
  }

  drawLife(ctx, x, y, rot, '#9cc', '#200', () => this.aggro)

  if (DRAW_COLLIDER) {
    ctx.lineWidth = 2
    ctx.strokeStyle = 'white'
    createConvexPolyPath(ctx, this.collider)
    ctx.stroke()
  }
}

const updateLookTri = function(x, y, rot) {
  /*         p
           / |
    (x,y) /  | m (straight-forward distance
        * \  |
           \ |
             q
    w = ang m*p
    (image where rot = 0 rad)
    */

  if (!this.look) {
    this.look = Triangle.create()
  }

  const w = Math.PI / 10
  const m = 100
  const d = m / Math.cos(w)

  const px = x + d * Math.cos(rot + w)
  const py = y + d * Math.sin(rot + w)

  const qx = x + d * Math.cos(rot - w)
  const qy = y + d * Math.sin(rot - w)

  this.look.a = [x, y]
  this.look.b = [px, py]
  this.look.c = [qx, qy]
}

const update = function(eng) {
  const { x, y, rot } = this

  const turnSpeed = 0.1

  this.rot += (Math.random() < 0.33 ? 1 : -1) * turnSpeed

  const d = 2 // distance to move per tick
  this.x += d * Math.cos(rot)
  this.y += d * Math.sin(rot)

  ConvexPoly.translate(this.collider, this.x, this.y)

  this.updateLookTri(x, y, rot)

  const player = Engine.getObject(eng, 'player')
  this.aggro = Triangle.contains(this.look, [player.x, player.y], 0.05)

  if (this.aggro) {
    this.rot = Math.atan2(player.y - this.y, player.x - this.x)
  }
}

export default (x, y) => ({
  x,
  y,
  collider: ConvexPoly.regular(x, y, 20, 6),
  rot: Math.random() * 2 * Math.PI,
  look: null,
  updateLookTri,
  aggro: false,
  draw,
  update
})
