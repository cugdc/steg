import Game from './Game.js'
import { BIND_START_GAME } from './keybinds.js'

document.getElementById("start-keybind").innerHTML = BIND_START_GAME
document.getElementById("content").style.display = null

const canvas = document.getElementById('game-view')
const game = new Game(canvas)
window.$game = game
game.nextFrame()

document.addEventListener('keydown', event => {
  if (event.code == BIND_START_GAME && !game.started) {
    game.start()
  } else {
    game.onKeyDown(event.code)
  }
})

