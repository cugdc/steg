const DRAW_POS_TEXT = false

export default class Entity {
  constructor(id, x, y, color) {
    this.id = id
    this.x = x | 0
    this.y = y | 0
    this.color = color

    this.draw = this.draw.bind(this)
    this.tick = this.tick.bind(this)
  }

  draw(ctx) {
    const { x, y } = this

    ctx.fillStyle = this.color

    const sc = $game.width / $game.nCells

    ctx.beginPath()

    ctx.save()
    {
      ctx.scale(sc, sc)
      ctx.moveTo(x, y)
      ctx.lineTo(x, y + 1)
      ctx.lineTo(x + 1, y + 1)
      ctx.lineTo(x + 1, y)
    }
    ctx.restore()

    ctx.fill()

    if (DRAW_POS_TEXT) {
      ctx.fillStyle = 'black'
      ctx.strokeStyle = 'white'
      ctx.font = '25px monospace'

      const args = [`${this.x},${this.y}`, x * sc, y * sc + sc]
      ctx.fillText(...args)
      ctx.strokeText(...args)
    }
  }

  tick() {
    if (Math.random() < 0.005) {
      const next = () => Math.floor(Math.random() * $game.nCells)
      $game.moveEntity(this, next(), next())
    }
  }
}
