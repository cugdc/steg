// TODO: codegen candidate

import { GameObj } from './index'

import {
  Draw,
  DrawSystem,
  Mouse,
  MouseSystem,
  Transform,
  TransformSystem
} from './impl'

export interface ComponentSet {
  draw?: Draw
  mouse?: Mouse
  transform?: Transform
}

export interface SystemSet {
  readonly draw: DrawSystem
  readonly mouse: MouseSystem
  readonly transform: TransformSystem
}

export enum ComponentType {
  DRAW,
  MOUSE,
  TRANSFORM
}

export function hasComponent(cs: ComponentSet, ct: ComponentType): boolean {
  switch (ct) {
    case ComponentType.DRAW:
      return !!cs.draw
    case ComponentType.MOUSE:
      return !!cs.mouse
    case ComponentType.TRANSFORM:
      return !!cs.transform
  }

  throw `Unknown component ${ct}`
}

export function createSystemSet(): SystemSet {
  return {
    draw: new DrawSystem(),
    mouse: new MouseSystem(),
    transform: new TransformSystem()
  }
}

export function addObjToSystems(obj: GameObj, ss: SystemSet): void {
  if (obj.components.draw) {
    ss.draw.add(obj.ref)
  }

  if (obj.components.mouse) {
    ss.mouse.add(obj.ref)
  }

  if (obj.components.transform) {
    ss.transform.add(obj.ref)
  }
}
