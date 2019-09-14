import Zombie from './entities/Zombie.js'
import * as Key from './keybinds.js'

export default class Game {
  constructor(canvas) {
    this.started = false

    this.ctx = canvas.getContext('2d', { alpha: false })
    this.width = canvas.width

    this.nCells = 32
    this.cells = Array(this.nCells).fill(Array(this.nCells).fill(null))

    this.egg = Math.random() < 0.03
    this.nTicks = 0

    const now = new Date()
    this.elapsed = () => (new Date() - now)

    ;[
      'addEntity',
      'draw',
      'drawLaunchScreen',
      'forEachEntity',
      'moveEntity',
      'nextFrame',
      'onKeyDown',
      'removeEntity',
      'start',
    ].map(fn => this[fn] = this[fn].bind(this))
  }

  onKeyDown(code) {
    // TODO
  }

  addEntity(entity) {
    if (entity.x >= this.nCells || entity.y >= this.nCells) {
      throw `Entity out of bounds: ${entity.id} at (${entity.x}, ${entity.y})`
    }

    this.cells[entity.x][entity.y] = entity
  }

  removeEntity(entity) {
    this.cells[entity.x][entity.y] = null
  }

  moveEntity(entity, x, y) {
    this.removeEntity(entity)

    entity.x = x
    entity.y = y

    this.addEntity(entity)
  }

  forEachEntity(consumer) {
    const { cells, nCells } = this

    for (let x = 0; x < nCells; x++) {
      for (let y = 0; y < nCells; y++) {
        if (cells[x][y]) {
          consumer.call(this, cells[x][y])
        }
      }
    }
  }

  nextFrame() {
    window.requestAnimationFrame(this.draw)
  }

  start() {
    this.started = true

    this.addEntity(new Zombie())
  }

  draw() {
    this.frames |= 0

    const {
      cells,
      ctx,
      entities,
      nCells,
      width
    } = this

    ctx.fillStyle = 'white' // Not consistent on all browsers (e.g. Firefox)
    ctx.fillRect(0, 0, width, width)

    if (this.frames % 12 == 0) {
      this.forEachEntity(e => e.tick())
    }

    if (this.started) {
      this.forEachEntity(e => {
        ctx.save()
        e.draw(ctx)
        ctx.restore()
      })
    } else {
      this.drawLaunchScreen()
    }

    this.frames++
    this.nextFrame()
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
    let xOff = 3 * Math.cos(this.elapsed() / 100)
    let yOff = 6 * Math.tan(this.elapsed() / 1000)
    ctx.strokeStyle = '#fff'
    ctx.strokeText(text, xOff + x, yOff + y)
  }
}
