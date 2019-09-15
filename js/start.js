import LaunchScreen from './objects/LaunchScreen.js'
import Zombie from './objects/Zombie.js'
import Engine from './Engine.js'
import { BIND_START_GAME } from './keybinds.js'

export const getCanvasElement = () => document.getElementById('game-view')

export const onPreInit = () => {
  document.getElementById("start-keybind").innerHTML = BIND_START_GAME
  document.getElementById("content").style.display = null
}

export const start = (eng) => {
  Engine.addObject(eng, LaunchScreen('launch-screen'))

  Engine.addKeyUpListener(eng, (eng, code) => {
    switch (code) {
      case BIND_START_GAME: {
        Engine.removeObject(eng, 'launch-screen')

        let i = 10
        while (i --> 0) {
          Engine.addObject(eng, Zombie(eng.width / 2 + i * 10 - 50, eng.height / 2 + i * 10 - 50))
        }

        break
      }
    }
  })
}
