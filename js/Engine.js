const create = (canvas) => ({
  suspended: false,
  ctx: canvas.getContext('2d', { alpha: false }),
  width: canvas.width,
  height: canvas.height,
  objs: [],
  listeners: {
    keyDown: [],
    keyUp: []
  },
  elapsed: 0,
  frames: 0,
  updates: 0
})

const getObject = (eng, id) => (eng.objs.find(o => o.$eng$id == id))

const addObject = (eng, obj, id) => {
  obj.$eng$id = id
  eng.objs.push(obj)
}

const removeObject = (eng, id) => {
  eng.objs = eng.objs.filter(o => (o === id || o.$eng$id != id))
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

  eng.frames++
  eng.updates++

  eng.objs.filter(o => !!o.update).forEach(o => o.update(eng))

  if (!eng._epoch) {
    eng._epoch = Date.now()
  }

  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, width, height)

  objs.filter(o => !!o.draw).forEach(o => {
    ctx.save()
    o.draw(eng)
    ctx.restore()
  })

  eng.elapsed = Date.now() - eng._epoch
}

const suspend = (eng) => {
  eng.suspended = true
}

const resume = (eng) => {
  eng.suspended = false
}

export default {
  create,
  getObject,
  addObject,
  removeObject,
  onKeyUp,
  onKeyDown,
  addKeyUpListener,
  addKeyDownListener,
  drawFrame,
  suspend,
  resume
}
