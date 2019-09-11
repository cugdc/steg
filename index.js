import Game from './src/Game.js'
import {BIND_START_GAME} from './src/Keybinds.js'

document.getElementById("start-keybind").text = BIND_START_GAME
document.getElementById("content").style.display = null

let gameStarted = false

document.addEventListener('keydown', event => {
  if (event.code == BIND_START_GAME && !gameStarted) {
    gameStarted = true

    const canvas = document.getElementById('game-canvas')
    new Game(canvas).start()
  }
})

