import { System, Component, ComponentType } from '../index'

export default interface Mouse extends Component {
  readonly onMouseMove?: (x: number, y: number) => void
  readonly onMouseDown?: (x: number, y: number) => void
  readonly onMouseUp?: (x: number, y: number) => void
}

export class MouseSystem extends System<Mouse> {
  constructor() {
    super(ComponentType.MOUSE)
  }

  onMouseMove(x: number, y: number): void {
    this.eachObj(o => {
      let m = o.components.mouse
      if (m.onMouseMove) {
        m.onMouseMove(x, y)
      }
    })
  }

  onMouseDown(x: number, y: number): void {
    this.eachObj(o => {
      let m = o.components.mouse
      if (m.onMouseDown) {
        m.onMouseDown(x, y)
      }
    })
  }

  onMouseUp(x: number, y: number): void {
    this.eachObj(o => {
      let m = o.components.mouse
      if (m.onMouseUp) {
        m.onMouseUp(x, y)
      }
    })
  }
}
