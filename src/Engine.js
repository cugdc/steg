export default class Engine {
  constructor(canvas, width, height) {
    this.suspended = false
    this.canvas = canvas
    this.ctx = canvas.getContext('2d', { alpha: false })
    this.width = width
    this.height = height
    this.objs = []
    this.listeners = {
      keyDown: [],
      keyUp: []
    }
    this.elapsed = 0
    this.frames = 0
    this.updates = 0
  }

  getObject(id) {
    this.objs.find(o => o.$eng$id == id)
  }

  addObject(obj, id) {
    obj.$eng$id = id || Math.random() + '.eng-gen-id'
    this.objs.push(obj)
  }

  removeObject(id) {
    this.objs = this.objs.filter(o => o === id || o.$eng$id != id)
  }

  onKeyUp(code) {
    this.listeners.keyUp.forEach(l => l.call(null, code))
  }

  onKeyDown(code) {
    this.listeners.keyDown.forEach(l => l.call(null, code))
  }

  onMouseMove(x, y) {
    this.objs.filter(o => !!o.onMouseMove).forEach(o => o.onMouseMove(x, y))
  }

  onMouseDown(x, y) {
    this.objs.filter(o => !!o.onMouseDown).forEach(o => o.onMouseDown(x, y))
  }

  onMouseUp(x, y) {
    this.objs.filter(o => !!o.onMouseUp).forEach(o => o.onMouseUp(x, y))
  }

  addKeyUpListener(listener) {
    this.listeners.keyUp.push(listener)
  }

  addKeyDownListener(listener) {
    this.listeners.keyDown.push(listener)
  }

  drawFrame() {
    const { ctx, canvas, width, height, objs } = this

    this.frames++
    this.updates++

    objs.filter(o => !!o.update).forEach(o => o.update())

    if (!this._epoch) {
      this._epoch = Date.now()
    }

    ctx.fillStyle = '#171717'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.save()
    ctx.scale(canvas.width / width, canvas.height / height)
    objs
      .filter(o => !!o.draw)
      .forEach(o => {
        ctx.save()
        o.draw()
        ctx.restore()
      })
    ctx.restore()

    this.elapsed = Date.now() - this._epoch
  }

  suspend() {
    this.suspended = true
  }

  resume() {
    this.suspended = false
  }
}
