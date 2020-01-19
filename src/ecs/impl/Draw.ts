import { Component, System, ComponentType } from '../index'
import { GameObjCb } from '..//GameObj'

export default interface Draw extends Component {
  readonly draw: GameObjCb<void>
}

export class DrawSystem extends System<Draw> {
  constructor() {
    super(ComponentType.DRAW)
  }
}
