import { EngineConfig } from './Engine'

export function getEngineConfig(): EngineConfig {
  return {
    canvas: document.getElementById('game-view') as HTMLCanvasElement,
    width: 500,
    height: 500
  }
}

export function onPreInit(): void {}

export function start(): void {}
