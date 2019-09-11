import TestEntity from './TestEntity.js'

export default class Game {
  constructor(canvas) {
    this.started = false

    this.ctx = canvas.getContext('2d', { alpha: false })
    this.width = canvas.width
    this.scale = 100// TODO

    this.entities = []
    this.egg = Math.random() < 0.03
    this.nTicks = 0

    const now = new Date()
    this.epoch = () => (new Date() - now)

    this.initCanvas = this.initCanvas.bind(this)
    this.elapsed = this.elapsed.bind(this)
    this.start = this.start.bind(this)
    this.draw = this.draw.bind(this)
    this.drawLaunchScreen = this.drawLaunchScreen.bind(this)
  }

  initCanvas() {
    window.requestAnimationFrame(this.draw)
  }

  elapsed() {
    const prev = this.__now
    this.__now = new Date()
    return prev ? this.__now - prev : 0
  }

  start() {
    this.started = true
    this.entities.push(new TestEntity())
  }

  draw() {
    const { ctx, entities, width } = this
    ctx.clearRect(0, 0, width, width)

    // targeting 20 tps; try to recover from up to 10 missed ticks
    let nTicks = Math.min(1, Math.max(10, Math.floor(this.elapsed() / 50)))
    this.nTicks += nTicks

    while (nTicks-- > 0) {
      entities.forEach(e => e.tick())
    }

    if (this.started) {
      entities.forEach(e => e.draw(ctx))
    } else {
      this.drawLaunchScreen()
    }

    window.requestAnimationFrame(this.draw)
  }

  drawLaunchScreen() {
    const { ctx, width } = this

    let image = ctx.createImageData(width, width)
    let buf = new Uint32Array(image.data.buffer)

    const stride = 25 // roughly how wide the x-bars are
    for (let i = 0; i < buf.length; i += stride) {
      const px = [~0, 0][Math.random() * 2 >> 0] // lol
      for (let j = 0; j < stride && j + i < buf.length; j++) {
        buf[i + j] = px
      }
    }

    ctx.putImageData(image, 0, 0)

    // "Zombruh" text
    let x = width * 0.05
    let y = width * 0.5
    ctx.font = '100px monospace'

    let text = 'Zombruh'
    if (this.egg) {
      text = 'Super ' + text.replace('ruh', 'io Bros.')
      ctx.font = '3' + ctx.font.substring(2)
    }

    // Green text
    ctx.fillStyle = !this.egg ? '#696' : '#faa'
    ctx.fillText(text, x, y)

    // Moving outline
    let xOff = 3 * Math.cos(this.epoch() / 100)
    let yOff = 6 * Math.tan(this.epoch() / 1000)
    ctx.strokeStyle = '#fff'
    ctx.strokeText(text, xOff + x, yOff + y)
  }
}
