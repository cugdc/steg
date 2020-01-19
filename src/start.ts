import Engine, { EngineConfig } from './Engine'
import { ComponentSet } from './ecs'
import { Mouse } from './ecs/impl'

export function getEngineConfig(): EngineConfig {
  return {
    canvas: document.getElementById('game-view') as HTMLCanvasElement,
    width: 500,
    height: 500
  }
}

export function onPreInit(): void {}

export function start(): void {
  let update = self => {}
  let mouse: Mouse = {
    onMouseMove: (x, y) => {
      console.log([x, y])
    }
  }
  let cs: ComponentSet = { mouse }
  let tester = Engine.instance.createObject(update, cs)
}
