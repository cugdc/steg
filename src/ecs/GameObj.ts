import { ComponentSet } from './index'

export interface GameObjCb<T> {
  (GameObj): T
}

export type GameObjRef = string

export default class GameObj {
  readonly ref: GameObjRef
  components: ComponentSet
  children: Set<GameObj>

  private readonly _update: GameObjCb<void>

  constructor(ref: GameObjRef, update: GameObjCb<void>) {
    this.ref = ref
    this._update = update
    this.components = {} as ComponentSet
    this.children = new Set()
  }

  update() {
    this._update(this)
  }
}
