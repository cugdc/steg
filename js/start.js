import LaunchScreen from './objects/LaunchScreen.js'
import Zombie from './objects/Zombie.js'
import Engine from './Engine.js'
import { BIND_START_GAME } from './keybinds.js'

export default (eng) => {
  Engine.addObject(eng, LaunchScreen('launch-screen'))

  Engine.addKeyUpListener(eng, (eng, code) => {
    switch (code) {
      case BIND_START_GAME:
        Engine.removeObject(eng, 'launch-screen')
        Engine.addObject(eng, Zombie(eng.width / 2, eng.height / 2))
        break
    }
  })
}
