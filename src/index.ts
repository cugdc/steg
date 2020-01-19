import Engine from './Engine'
import * as Impl from './start'

const eng: Engine = new Engine(Impl.getEngineConfig())

// Exposed for debugging in console. Don't use `$eng` in source code.
;(window as any).$eng = Engine.instance

let frameId: number
const drawNextFrame = () => {
  eng.drawFrame()
  frameId = window.requestAnimationFrame(drawNextFrame)
}

function toggleEngineSuspension(): void {
  if (eng.suspended) {
    eng.suspended = false
    drawNextFrame()
  } else {
    eng.suspended = true

    eng.ctx.save()
    drawSuspensionGraphic(eng.ctx)
    eng.ctx.restore()

    window.cancelAnimationFrame(frameId)
  }
}

function drawSuspensionGraphic(ctx: CanvasRenderingContext2D): void {
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

function getEnginePos(clientX: number, clientY: number): [number, number] {
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
