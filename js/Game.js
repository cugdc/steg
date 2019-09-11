export default class Game {
  constructor(canvas) {
    this.ctx = canvas.getContext('2d', { alpha: false })
    this.width = canvas.width
    this.entities = []
    this.started = false

    const now = new Date()
    this.elapsed = () => (new Date() - now) // milliseconds

    this.initCanvas = this.initCanvas.bind(this)
    this.start = this.start.bind(this)
    this.draw = this.draw.bind(this)
    this.drawLaunchScreen = this.drawLaunchScreen.bind(this)
  }

  initCanvas() {
    window.requestAnimationFrame(this.draw)
  }

  start() {
    this.started = true
  }

  draw() {
    const { ctx, width } = this
    ctx.clearRect(0, 0, width, width)

    if (!this.started) {
      this.drawLaunchScreen()
    } else {
      // TODO: render game entities
    }

    window.requestAnimationFrame(this.draw)
  }

  drawLaunchScreen() {
    const { ctx, width } = this

    let image = ctx.createImageData(width, width)
    let buf = new Uint32Array(image.data.buffer)

    const stride = 25; // roughly how wide the x-bars are
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

    // Green text
    ctx.fillStyle = '#696'
    ctx.fillText("Zombruh", x, y)

    // Moving outline
    let xOff = 3 * Math.cos(this.elapsed() / 100)
    let yOff = 6 * Math.tan(this.elapsed() / 1000)
    ctx.strokeStyle = '#fff'
    ctx.strokeText("Zombruh", xOff + x, yOff + y)
  }
}
