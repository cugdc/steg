import Engine from './Engine.js'
import { BIND_START_GAME } from './keybinds.js'
import LaunchScreen from './objects/LaunchScreen.js'

document.getElementById("start-keybind").innerHTML = BIND_START_GAME
document.getElementById("content").style.display = null

const eng = Engine.create(document.getElementById('game-view'))

document.addEventListener('keydown', e => Engine.onKeyDown(eng, e.code))
document.addEventListener('keyup', e => Engine.onKeyUp(eng, e.code))

const drawNextFrame = () => {
  Engine.drawFrame(eng)
  window.requestAnimationFrame(drawNextFrame)
}

Engine.addObject(eng, LaunchScreen('launch-screen'))

Engine.addKeyUpListener(eng, (eng, code) => {
  if (code == BIND_START_GAME) {
    Engine.removeObject(eng, 'launch-screen')
  }
})

drawNextFrame()
