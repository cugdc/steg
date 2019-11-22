import Engine from './Engine'
import * as Impl from './start'

/* Create and globally expose the singleton engine */
{
  const { canvas, width, height } = Impl.getEngineConfig()
  window.eng = new Engine(canvas, width, height)
}

let frameId
const drawNextFrame = () => {
  eng.drawFrame()
  frameId = window.requestAnimationFrame(drawNextFrame)
}

const toggleEngineSuspension = () => {
  if (eng.suspended) {
    eng.resume()
    drawNextFrame()
  } else {
    eng.suspend()

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

const getEnginePos = (clientX, clientY) => {
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
    eng.onKeyUp(code)
  }
})

document.addEventListener('keydown', ({ code }) => {
  if (code == 'Escape') {
    toggleEngineSuspension()
    return
  }

  if (!eng.suspended) {
    eng.onKeyDown(code)
  }
})

eng.canvas.addEventListener('mousemove', ({ clientX, clientY }) => {
  if (eng.suspended) {
    return
  }

  const [x, y] = getEnginePos(clientX, clientY)
  eng.onMouseMove(x, y)
})

eng.canvas.addEventListener('mousedown', ({ clientX, clientY }) => {
  if (eng.suspended) {
    return
  }

  const [x, y] = getEnginePos(clientX, clientY)
  eng.onMouseDown(x, y)
})

eng.canvas.addEventListener('mouseup', ({ clientX, clientY }) => {
  if (eng.suspended) {
    return
  }

  const [x, y] = getEnginePos(clientX, clientY)
  eng.onMouseUp(x, y)
})

/* Post browser/canvas binding -> engine is ready */

Impl.start()

drawNextFrame()
