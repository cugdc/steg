import Engine from './Engine.js'
import * as Impl from './start.js'

const eng = Impl.createEngine()

/* It's in our best interests to not make eng a global variable, however
 * often devs or testers want to interact with it in the JS console.
 *
 * As compromise, we can explicitly expose eng.
 */
window.exposeEngine = () => {
  window.Engine = Engine // the module
  window.eng = eng // the instance
}

let frameId
const drawNextFrame = () => {
  Engine.drawFrame(eng)
  frameId = window.requestAnimationFrame(drawNextFrame)
}

const toggleEngineSuspension = () => {
  if (eng.suspended) {
    Engine.resume(eng)
    drawNextFrame()
  } else {
    Engine.suspend(eng)

    eng.ctx.save()
    drawSuspensionGraphic(eng.ctx)
    eng.ctx.restore()

    window.cancelAnimationFrame(frameId)
  }
}

const drawSuspensionGraphic = ctx => {
  const message = 'Suspended'

  ctx.font = 'italic bold 32px Arial'
  ctx.fillStyle = '#d02120'

  const width = eng.ctx.measureText(message).width

  // block-ish letter abuse
  const height = eng.ctx.measureText('M').width

  const oX = 5
  const oY = 5

  ctx.fillRect(0, 0, width + 2 * oX, height + 3 * oY)
  ctx.fillStyle = 'white'
  ctx.fillText(message, oX, oY + height)
}

const getEnginePos = (eng, clientX, clientY) => {
  const canvasBounds = eng.canvas.getBoundingClientRect()

  let x = clientX - canvasBounds.left
  let y = clientY - canvasBounds.top

  x *= eng.width / eng.canvas.width
  y *= eng.height / eng.canvas.height

  return [x, y]
}

Impl.onPreInit()

/* Bind browser and canvas events to engine events. */

document.addEventListener('keyup', ({ code }) => {
  if (!eng.suspended) {
    Engine.onKeyUp(eng, code)
  }
})

document.addEventListener('keydown', ({ code }) => {
  if (code == 'Escape') {
    toggleEngineSuspension()
    return
  }

  if (!eng.suspended) {
    Engine.onKeyDown(eng, (eng, code))
  }
})

eng.canvas.addEventListener('mousemove', ({ clientX, clientY }) => {
  if (eng.suspended) {
    return
  }

  const [x, y] = getEnginePos(eng, clientX, clientY)
  Engine.onMouseMove(eng, x, y)
})

eng.canvas.addEventListener('mousedown', ({ clientX, clientY }) => {
  if (eng.suspended) {
    return
  }

  const [x, y] = getEnginePos(eng, clientX, clientY)
  Engine.onMouseDown(eng, x, y)
})

eng.canvas.addEventListener('mouseup', ({ clientX, clientY }) => {
  if (eng.suspended) {
    return
  }

  const [x, y] = getEnginePos(eng, clientX, clientY)
  Engine.onMouseUp(eng, x, y)
})

/* Post browser/canvas binding -> engine is ready */

Impl.start(eng)

drawNextFrame()
