import { Component, System, ComponentType } from '../index'

export default interface Transform extends Component {
  x: number
  y: number
  z?: number
  rot?: number
  scale?: number
}

export class TransformSystem extends System<Transform> {
  constructor() {
    super(ComponentType.TRANSFORM)
  }
}
