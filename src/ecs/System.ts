import Engine from '../Engine'

import {
  Component,
  ComponentType,
  GameObj,
  GameObjCb,
  GameObjRef,
  hasComponent
} from './index'

export default class System<Cpt extends Component> {
  // set of (possibly invalid) refs to objs in this system
  protected refs: Set<GameObjRef>

  // required to verify each ref has a component for this system
  private readonly cptType: ComponentType

  constructor(cptType: ComponentType) {
    this.cptType = cptType
    this.refs = new Set()
  }

  add(ref: GameObjRef): void {
    this.refs.add(ref)
  }

  clearInvalidRefsAndApply(fn: GameObjCb<void>): void {
    let valid = new Set<GameObjRef>()

    for (let ref of this.refs) {
      let obj = Engine.instance.getObject(ref)
      if (obj && hasComponent(obj.components, this.cptType)) {
        valid.add(ref)
        if (fn) fn(obj)
      }
    }

    this.refs = valid
  }

  eachObj(fn: GameObjCb<void>) {
    this.clearInvalidRefsAndApply(fn)
  }
}
