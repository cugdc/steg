import uuidv4 from 'uuid/v4'

export type KeyListener = (key: string) => void
export type MouseListener = (x: number, y: number) => void
export type GameObjRef = string

export interface GameObj {
  ref: GameObjRef

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

  private objs: Map<GameObjRef, GameObj>
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
    this.objs = new Map<GameObjRef, GameObj>()
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

  getObject(ref: GameObjRef): GameObj | null {
    return this.objs.get(ref) || null
  }

  addObject(obj: GameObj, ref?: GameObjRef): void {
    if (!ref || !obj.ref) {
      obj.ref = uuidv4()
    }

    this.objs.set(obj.ref, obj)
  }

  removeObject(ref: GameObjRef): void {
    this.objs.delete(ref)
  }

  onKeyUp(code: string): void {
    this.listeners.keyUp.forEach(l => l.call(null, code))
  }

  onKeyDown(code: string): void {
    this.listeners.keyDown.forEach(l => l.call(null, code))
  }

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
