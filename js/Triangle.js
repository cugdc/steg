const create = (a, b, c) => { a, b, c }

const contains = (t, p) => (
  area(t) == area(create(t.a, t.b, p)) +
             area(create(t.a, t.c, p)) +
             area(create(t.b, t.c, p))
)

const area(t) => (
  Math.abs(
    t.a.x * (t.b.y - t.c.y) +
    t.b.x * (t.c.y - t.a.y) +
    t.c.x * (t.a.y - t.b.y)
  ) / 2
)

export default {
  create,
  contains,
  area
}
