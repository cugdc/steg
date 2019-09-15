const create = (a, b, c) => ({a, b, c})

const contains = (t, p, err) => {
  const sumArea = area(create(t.a, t.b, p)) +
                  area(create(t.a, t.c, p)) +
                  area(create(t.b, t.c, p))

  const delta = Math.abs(area(t) - sumArea)

  return delta < err
}

const area = t => (
  Math.abs(
    t.a[0] * (t.b[1] - t.c[1]) +
    t.b[0] * (t.c[1] - t.a[1]) +
    t.c[0] * (t.a[1] - t.b[1])
  ) / 2
)

export default {
  create,
  contains,
  area
}
