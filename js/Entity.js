export default class Entity {
  constructor(id, x, y) {
    this.id = id
    this.x = x
    this.y = y
  }

  draw(ctx) {}
  tick() {}
}
