const create = (canvas) => ({
  started: false,
  ctx: canvas.getContext('2d', { alpha: false }),
  width: canvas.width,
  height: canvas.height,
  objs: [],
  listeners: {
    keyDown: [],
    keyUp: []
  },
  elapsed: 0,
  epoch: Date.now()
})

const addObject = (eng, obj) => {
  eng.objs.push(obj)
}

const removeObject = (eng, id) => {
  eng.objs = eng.objs.filter(o => (o === id || o.id != id))
}

const onKeyUp = (eng, code) => {
  eng.listeners.keyUp.forEach(l => l.call(null, eng, code))
}

const onKeyDown = (eng, code) => {
  eng.listeners.keyDown.forEach(l => l.call(null, eng, code))
}

const addKeyUpListener = (eng, listener) => {
  eng.listeners.keyUp.push(listener)
}

const addKeyDownListener = (eng, listener) => {
  eng.listeners.keyDown.push(listener)
}

const drawFrame = (eng) => {
  const { ctx, width, height, objs } = eng

  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, width, height)

  objs.filter(o => !!o.draw).forEach(o => {
    ctx.save()
    o.draw(eng)
    ctx.restore()
  })

  eng.elapsed = Date.now() - eng.epoch
}

export default {
  create,
  addObject,
  removeObject,
  onKeyUp,
  onKeyDown,
  addKeyUpListener,
  addKeyDownListener,
  drawFrame
}
