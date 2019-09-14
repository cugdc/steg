import Entity from '../Entity.js'

export default class Zombie extends Entity {
  constructor(x, y) {
    super('zombie-' + Math.random(), x, y, '#696')
  }

  tick() {
    console.log('zombie tick')
  }
}
