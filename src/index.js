import Engine from './Engine.js'
import * as Impl from './start.js'

const canvas = Impl.getCanvasElement()
const eng = Engine.create(canvas, 500, 500)

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

const drawSuspensionGraphic = (ctx) => {
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
  const canvasBounds = canvas.getBoundingClientRect()

  let x = clientX - canvasBounds.left
  let y = clientY - canvasBounds.top

  x *= eng.width / canvas.width
  y *= eng.height / canvas.height

  return [x, y]
}

Impl.onPreInit()

document.addEventListener('keyup', ({code}) => {
  if (!eng.suspended) {
    Engine.onKeyUp(eng, code)
  }
})

document.addEventListener('keydown', ({code}) => {
  if (code == 'Escape') {
    toggleEngineSuspension()
    return
  }

  if (!eng.suspended) {
    Engine.onKeyDown(eng, (eng, code))
  }
})

canvas.addEventListener('mousemove', ({ clientX, clientY }) => {
  if (eng.suspended) {
    return
  }

  const [x, y] = getEnginePos(eng, clientX, clientY)
  Engine.onMouseMove(eng, x, y)
})

canvas.addEventListener('mousedown', ({ clientX, clientY }) => {
  if (eng.suspended) {
    return
  }

  const [x, y] = getEnginePos(eng, clientX, clientY)
  Engine.onMouseDown(eng, x, y)
})

canvas.addEventListener('mouseup', ({ clientX, clientY }) => {
  if (eng.suspended) {
    return
  }

  const [x, y] = getEnginePos(eng, clientX, clientY)
  Engine.onMouseUp(eng, x, y)
})

Impl.start(eng)

drawNextFrame()
