import LaunchScreen from './objects/LaunchScreen.js'
import Zombie from './objects/Zombie.js'
import Player from './objects/Player.js'
import Crosshair from './objects/Crosshair.js'
import Engine from './Engine.js'
import Boulder from './objects/Boulder.js'
import * as Keys from './keybinds.js'

export const getCanvasElement = () => document.getElementById('game-view')

export const onPreInit = () => {
  document.getElementById("start-keybind").innerHTML = Keys.BIND_START_GAME
  document.getElementById("content").style.display = null
}

let initialized
export const start = (eng) => {
  Engine.addObject(eng, LaunchScreen(), 'launch-screen')

  Engine.addKeyUpListener(eng, (eng, code) => {
    if (!initialized && code == Keys.BIND_START_GAME) {
      initializeGame(eng)
      initialized = true
      return
    }

    switch (code) {
      case Keys.BIND_MOVE:
        Engine.getObject(eng, 'player').setSpeed(0)
        break
      case Keys.BIND_TURN_CW:
      case Keys.BIND_TURN_CCW:
        Engine.getObject(eng, 'player').setRotSpeed(0)
        break
      case 'KeyZ':
        Engine.addObject(eng, Zombie(250,250))
        break
    }
  })

  Engine.addKeyDownListener(eng, (eng, code) => {
    if (!initialized) {
      return
    }

    switch (code) {
      case Keys.BIND_MOVE:
        Engine.getObject(eng, 'player').setSpeed(1)
        break
      case Keys.BIND_TURN_CW:
        Engine.getObject(eng, 'player').setRotSpeed(+0.075)
        break
      case Keys.BIND_TURN_CCW:
        Engine.getObject(eng, 'player').setRotSpeed(-0.075)
        break
    }
  })
}

const initializeGame = eng => {
  Engine.removeObject(eng, 'launch-screen')

  let i = 10
  while (i --> 0) {
    Engine.addObject(eng, Zombie(eng.width / 2 + i * 10 - 50, eng.height / 2 + i * 10 - 50))
  }

  Engine.addObject(eng, Player(eng.width / 2, eng.height / 2), 'player')
  Engine.addObject(eng, Crosshair(eng.width / 2, eng.height / 2), 'crosshair')


  Engine.addObject(eng, Boulder(200, 200, 50, 8), 'boulder')
}
