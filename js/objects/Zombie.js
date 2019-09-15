import Triangle from '../Triangle.js'

const draw = function({ ctx, updates }) {
  const { x, y, rot, look } = this

  // Look tri
  ctx.strokeStyle = this.canSee.length > 0 ? '#700' : '#aaa'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(look.a[0], look.a[1])
  ctx.lineTo(look.b[0], look.b[1])
  ctx.lineTo(look.c[0], look.c[1])
  ctx.closePath()
  ctx.stroke()

  // Zombie body
  ctx.fillStyle = '#696'
  ctx.beginPath()
  ctx.arc(x, y, 15, 0, 2 * Math.PI)
  ctx.fill()

  // Zombie eye TODO: needs to rotate with zombie
  ctx.fillStyle = '#364'
  ctx.beginPath()
  ctx.arc(x, y + 5, 4, 0, 2 * Math.PI)
  ctx.fill()

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

  this.canSee = eng.objs.filter(o => {
    if (o !== this && 'x' in o && 'y' in o) {
      let r = Triangle.contains(this.look, [o.x, o.y], 0.05)
      return r
    }
  })
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
