export type KeyListener = (key: string) => void
export type MouseListener = (x: number, y: number) => void

export interface GameObj {
  id: string

  onMouseMove?: MouseListener
  onMouseDown?: MouseListener
  onMouseUp?: MouseListener

  update: () => void
  draw: () => void
}

export interface EngineConfig {
  canvas: HTMLCanvasElement
  width: number
  height: number
}

export default class Engine {
  suspended: boolean
  ctx: CanvasRenderingContext2D
  width: number
  height: number
  canvas: HTMLCanvasElement

  private objs: GameObj[]
  private listeners: { keyDown: KeyListener[]; keyUp: KeyListener[] }
  private frames: number
  private updates: number
  private elapsed: number
  private epoch?: number

  constructor(config: EngineConfig) {
    this.suspended = false
    this.canvas = config.canvas
    this.width = config.width
    this.height = config.height
    this.objs = []
    this.listeners = {
      keyDown: [],
      keyUp: []
    }
    this.elapsed = 0
    this.frames = 0
    this.updates = 0
    this.epoch = undefined // lazily initialized on first render

    {
      let ctx = config.canvas.getContext('2d', { alpha: false })
      if (ctx == null) {
        throw 'Failed to get 2D rendering context'
      }

      this.ctx = ctx
    }
  }

  getObject(id: string): GameObj | null {
    return this.objs.find(o => o.id == id) || null
  }

  addObject(obj: GameObj, id?: string): void {
    // FIXME: use a proper GUID instead of Math.random()
    obj.id = id || Math.random() + '.eng-gen-id'
    this.objs.push(obj)
  }

  removeObject(id: string): void {
    this.objs = this.objs.filter(o => o.id != id)
  }

  onKeyUp(code: string): void {
    this.listeners.keyUp.forEach(l => l.call(null, code))
  }

  onKeyDown(code: string): void {
    this.listeners.keyDown.forEach(l => l.call(null, code))
  }

  // XXX: this.objs.filter(o => !!o.onMouseMove).forEach(...) was seeing
  // the gameobj's onMouseMove fn as possibly null in the forEach lambda.
  // (hack is to disable strictNullChecks, which we don't want to do)
  onMouseMove(x: number, y: number): void {
    this.objs.forEach(o => {
      if (o.onMouseMove) o.onMouseMove(x, y)
    })
  }

  onMouseDown(x: number, y: number): void {
    this.objs.forEach(o => {
      if (o.onMouseDown) o.onMouseDown(x, y)
    })
  }

  onMouseUp(x: number, y: number): void {
    this.objs.forEach(o => {
      if (o.onMouseUp) o.onMouseUp(x, y)
    })
  }

  addKeyUpListener(listener: KeyListener): void {
    this.listeners.keyUp.push(listener)
  }

  addKeyDownListener(listener: KeyListener): void {
    this.listeners.keyDown.push(listener)
  }

  resizeCanvas(width: number, height: number): void {
    this.canvas.width = width
    this.canvas.height = height
  }

  drawFrame(): void {
    const { ctx, canvas, width, height, objs } = this

    this.frames++
    this.updates++

    if (!this.epoch) {
      this.epoch = Date.now()
    }

    objs.forEach(o => o.update())

    ctx.fillStyle = '#171717'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.save()
    ctx.scale(canvas.width / width, canvas.height / height)
    objs.forEach(o => {
      ctx.save()
      o.draw()
      ctx.restore()
    })
    ctx.restore()

    this.elapsed = Date.now() - this.epoch
  }

  suspend(): void {
    this.suspended = true
  }

  resume(): void {
    this.suspended = false
  }
}
