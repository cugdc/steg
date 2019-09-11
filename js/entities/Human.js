import Entity from '../Entity.js'

export default class Human extends Entity {
  constructor(x, y) {
    super('human-' + Math.random(), x, y, '#5cf')
  }
}
