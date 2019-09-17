
const generate = (x, y, r, n) => {
  const angles = []

  let last = 0
  for (let i = 0; i < n; i++) {
    last += 2 * Math.PI * Math.random()
    last %= 2 * Math.PI
    angles.push(last)
  }

  angles.sort() // stored in counter-clockwise order

  const vertices = [] // stored in clockwise order
  for (let i = angles.length - 1; i >= 0; i--) {
    const theta = angles[i]
    const vx = x + r * Math.cos(theta)
    const vy = y + r * Math.sin(theta)
    vertices.push([vx, vy])
  }

  return {
    vertices,
    tris: _triangulate(vertices)
  }
}

const _triangulate = poly => {
  const tris = []
  for (let i = 1; i < poly.length - 1; i++) {
    tris.push(Triangle.create(poly[0], poly[i], poly[i + 1]))
  }

  return tris
}

const contains = (poly, point) => (
  poly.tris.some(t => Triangle.contains(t, point, 0.05))
)

export default {
  generate,
  contains
}
