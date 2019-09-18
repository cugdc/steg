import Triangle from './Triangle.js'

const random = (x, y, r, n) => {
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

  return _create(x, y, r, vertices)
}

const regular = (x, y, r, n) => {
  const vertices = []
  const step = 2 * Math.PI / n

  for (let i = n - 1; i >= 0; i--) {
    const vx = x + r * Math.cos(step * i)
    const vy = y + r * Math.sin(step * i)
    vertices.push([vx, vy])
  }

  return _create(x, y, r, vertices)
}

const _create = (x, y, radius, vertices) => ({
  x,
  y,
  radius,
  vertices,
  tris: _triangulate(vertices)
})

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

const intersects = (poly1, poly2) => {
  for (const v of poly1.vertices) {
    if (contains(poly2, v)) {
      return true
    }
  }

  for (const v of poly2.vertices) {
    if (contains(poly1, v)) {
      return true
    }
  }

  return false
}

const translate = (poly, x, y) => {
  const dx = x - poly.x
  const dy = y - poly.y

  poly.x = x
  poly.y = y

  for (let i = 0; i < poly.vertices.length; i++) {
    poly.vertices[i][0] += dx
    poly.vertices[i][1] += dy
  }

  for (let i = 0; i < poly.tris.length; i++) {
    Triangle.translate(poly.tris[i], dx, dy)
  }
}

export default {
  random,
  regular,
  contains,
  intersects,
  translate
}
