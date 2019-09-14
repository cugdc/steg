import Engine from './Engine.js'
import * as Impl from './start.js'

const eng = Engine.create(Impl.getCanvasElement())

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

  Engine.onKeyDown(eng, (eng, code))
})

Impl.start(eng)

drawNextFrame()
