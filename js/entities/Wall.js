import Entity from '../Entity.js'

export default class Wall extends Entity {
  constructor(x, y) {
    super('wall-' + Math.random(), x, y, '#a84')
  }
}
