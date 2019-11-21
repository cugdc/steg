const create = (a, b, c) => ({ a, b, c })

const translate = (t, dx, dy) => {
  t.a[0] += dx
  t.a[1] += dy

  t.b[0] += dx
  t.b[1] += dy

  t.c[0] += dx
  t.c[1] += dy
}

const contains = (t, p, err) => {
  const sumArea = _area(t.a, t.b, p) + _area(t.a, t.c, p) + _area(t.b, t.c, p)

  const delta = Math.abs(area(t) - sumArea)

  return delta < err
}

const area = t => _area(t.a, t.b, t.c)

const _area = (a, b, c) =>
  Math.abs(a[0] * (b[1] - c[1]) + b[0] * (c[1] - a[1]) + c[0] * (a[1] - b[1])) /
  2

export default {
  translate,
  create,
  contains,
  area
}
