import LaunchScreen from './objects/LaunchScreen.js'
import Zombie, { dbgToggle } from './objects/Zombie.js'
import Player, { playerDbgToggle } from './objects/Player.js'
import Crosshair from './objects/Crosshair.js'
import Engine from './Engine.js'
import Boulder from './objects/Boulder.js'
import * as Keys from './keybinds.js'

export const getCanvasElement = () => document.getElementById('game-view')

export const onPreInit = () => {
  document.getElementById('start-keybind').innerHTML = Keys.BIND_START_GAME
  document.getElementById('content').style.display = null

  document.getElementById('dbg-player-coll').onclick = e => {
    playerDbgToggle('DRAW_COLLIDER')
  }

  document.getElementById("dbg-zombie-coll").onclick = e => {
    dbgToggle('DRAW_COLLIDER')
  }

  document.getElementById('dbg-zombie-cone').onclick = e => {
    dbgToggle('DRAW_LOOK_TRI')
  }

  document.getElementById('dbg-zombie-tree').onclick = e => {
    dbgToggle('DRAW_TREE')
  }
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

  // TODO add z-index so add order doesn't matter

  Engine.addObject(eng, Crosshair(eng.width / 2, eng.height / 2), 'crosshair')

  // XXX need better way to hide player from collisions...
  Engine.addObject(eng, Player(-100000, -100000), 'player')

  const zx = eng.width / 4 + Math.random() * eng.width / 2
  const zy = eng.height / 4 + Math.random() * eng.height / 2


  for (let i = 0; i < 10; i++) {
    const bx = eng.width * Math.random()
    const by = eng.height * Math.random()
    const radius = 15 + 30 * Math.random()
    const vertices = Math.floor(10 + 16 * Math.random())
    Engine.addObject(eng, Boulder(bx, by, radius, vertices), 'boulder-' + i)
  }
}
