import Engine from './Engine.js'
import { BIND_START_GAME } from './keybinds.js'

document.getElementById("start-keybind").innerHTML = BIND_START_GAME
document.getElementById("content").style.display = null

const eng = Engine.of(document.getElementById('game-view'))

document.addEventListener('keydown', e => Engine.onKeyDown(eng, e.code))
document.addEventListener('keyup', e => Engine.onKeyUp(eng, e.code))

const drawNextFrame = () => {
  Engine.drawFrame(eng)
  window.requestAnimationFrame(drawNextFrame)
}

drawNextFrame()

Engine.addObject(eng, {
  id: 'launch-screen',
  egg: Math.random() < 0.03,
  draw: function({ ctx, width, height }) {
    let image = ctx.createImageData(width, height)
    let buf = new Uint32Array(image.data.buffer)

    const stride = 25 // roughly how wide the x-bars are
    for (let i = 0; i < buf.length; i += stride) {
      const px = Math.random() > 1 / 6 ? -1 : 0
      for (let j = 0; j < stride && j + i < buf.length; j++) {
        buf[i + j] = px
      }
    }

    ctx.putImageData(image, 0, 0)

    // "Zombruh" text
    let x = width * 0.05
    let y = width * 0.5
    ctx.font = '100px monospace'

    let text = 'Zombruh'
    if (this.egg) {
      text = 'Super ' + text.replace('ruh', 'io Bros.')
      ctx.font = '3' + ctx.font.substring(2)
    }

    // Green text
    ctx.fillStyle = !this.egg ? '#696' : '#faa'
    ctx.fillText(text, x, y)

    // Moving outline
    let xOff = 3 * Math.cos(eng.elapsed / 100)
    let yOff = 6 * Math.tan(eng.elapsed / 1000)
    ctx.strokeStyle = '#000'
    ctx.strokeText(text, xOff + x, yOff + y)
  }
})

Engine.addKeyUpListener(eng, (eng, code) => {
  if (code == BIND_START_GAME) {
    Engine.removeObject(eng, 'launch-screen')
  }
})
