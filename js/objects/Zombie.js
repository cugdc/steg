import Triangle from '../Triangle.js'
import { drawLife, drawTriangle } from '../RenderUtils.js'

const DRAW_LOOK_TRI = false

const draw = function({ ctx, updates }) {
  const { x, y, rot } = this

  const isAggro = () => (this.canSee.length > 0)

  if (DRAW_LOOK_TRI) {
    const c = () => (isAggro() ? '#700' : '#ccc')
    drawTriangle(ctx, this.look, c)
  }

  drawLife(ctx, x, y, rot, '#696', '#363', isAggro)
}

const createLookTri = (x, y, rot) => {
  /*         p
           / |
    (x,y) /  | m (straight-forward distance
        * \  |
           \ |
             q
    w = ang m*p
    (image where rot = 0 rad)
  */

  const w = Math.PI / 10
  const m = 100
  const d = m / Math.cos(w)

  const px = x + d * Math.cos(rot + w)
  const py = y + d * Math.sin(rot + w)

  const qx = x + d * Math.cos(rot - w)
  const qy = y + d * Math.sin(rot - w)

  return Triangle.create([x, y], [px, py], [qx, qy])
}

const update = function(eng) {
  const { x, y, rot } = this

  const turnSpeed = 0.1

  this.rot += (Math.random() < 0.33 ? 1 : -1) * turnSpeed

  const d = 2 // distance to move per tick
  this.x += d * Math.cos(rot)
  this.y += d * Math.sin(rot)

  this.look = createLookTri(x, y, rot)

  this.canSee = eng.objs.filter(o => (o.human &&
    Triangle.contains(this.look, [o.x, o.y], 0.05)))
}

export default (x, y) => ({
  x,
  y,
  rot: Math.random() * 2*Math.PI,
  look: null,
  canSee: [],
  draw,
  update
})
