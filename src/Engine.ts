import uuidv4 from 'uuid/v4'
import {
  GameObj,
  GameObjCb,
  GameObjRef,
  ComponentSet,
  SystemSet,
  createSystemSet,
  addObjToSystems
} from './ecs'

export interface KeyListener {
  (key: string): void
}

export interface EngineConfig {
  canvas: HTMLCanvasElement
  width: number
  height: number
}

export default class Engine {
  static instance: Engine

  suspended: boolean

  // TODO: can we hide these fields?
  ctx: CanvasRenderingContext2D
  width: number
  height: number
  canvas: HTMLCanvasElement

  private objs: Map<GameObjRef, GameObj>
  private listeners: { keyDown: KeyListener[]; keyUp: KeyListener[] }
  private systems: SystemSet

  // TODO: of these 4, which is actually needed?
  private frames: number
  private updates: number
  private elapsed: number
  private epoch?: number

  constructor(config: EngineConfig) {
    Engine.instance = this

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

    this.systems = createSystemSet()
  }

  createObject(update: GameObjCb<void>, components?: ComponentSet): GameObj {
    let ref = uuidv4()
    let obj = new GameObj(ref, update)

    if (components) {
      obj.components = components
    }

    this.addObject(obj)
    return obj
  }

  getObject(ref: GameObjRef): GameObj | null {
    return this.objs.get(ref) || null
  }

  addObject(obj: GameObj): void {
    addObjToSystems(obj, this.systems)
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
    this.systems.mouse.onMouseMove(x, y)
  }

  onMouseDown(x: number, y: number): void {
    this.systems.mouse.onMouseDown(x, y)
  }

  onMouseUp(x: number, y: number): void {
    this.systems.mouse.onMouseUp(x, y)
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

  // TODO: we gotta separate drawFrame from onUpdate
  drawFrame(): void {
    const { ctx, canvas, width, height, objs } = this

    this.frames++
    this.updates++

    if (!this.epoch) {
      this.epoch = Date.now()
    }

    objs.forEach(o => o.update())
    /* TODO: only draw Objs with component `Draw`
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
*/
    this.elapsed = Date.now() - this.epoch
  }
}
