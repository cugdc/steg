import Entity from './Entity.js'

export default class TestEntity extends Entity {
  constructor() {
    super('test-entity-' + Math.random(), 5, 5)
  }

  draw(ctx) {
    ctx.fillStyle = 'red'
    ctx.beginPath()
    ctx.arc(100 * Math.abs(Math.sin($game.nTicks/100)), this.y, $game.scale / 2, 0, 2 * Math.PI)
    ctx.fill()
  }
}
