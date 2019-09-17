import ConvexPoly from './ConvexPoly.js'

const create = (canvas, width, height) => ({
  suspended: false,
  ctx: canvas.getContext('2d', { alpha: false }),
  frame: { w: () => canvas.width, h: () => canvas.height },
  width,
  height,
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

const onMouseMove = (eng, x, y) => {
  eng.objs.filter(o => !!o.onMouseMove).forEach(o => o.onMouseMove(x, y))
}

const addKeyUpListener = (eng, listener) => {
  eng.listeners.keyUp.push(listener)
}

const addKeyDownListener = (eng, listener) => {
  eng.listeners.keyDown.push(listener)
}

const drawFrame = (eng) => {
  const { ctx, frame, width, height, objs } = eng

  eng.frames++
  eng.updates++

  _checkCollisions(eng)
  eng.objs.filter(o => !!o.update).forEach(o => o.update(eng))

  if (!eng._epoch) {
    eng._epoch = Date.now()
  }

  ctx.fillStyle = '#171717'
  ctx.fillRect(0, 0, frame.w(), frame.h())

  ctx.save()
  ctx.scale(frame.w() / width, frame.h() / height)
  objs.filter(o => !!o.draw).forEach(o => {
    ctx.save()
    o.draw(eng)
    ctx.restore()
  })
  ctx.restore()

  eng.elapsed = Date.now() - eng._epoch
}

const suspend = (eng) => {
  eng.suspended = true
}

const resume = (eng) => {
  eng.suspended = false
}

const _checkCollisions = (eng) => {
  for (let i = 0; i < eng.objs.length; i++) {
    const o1 = eng.objs[i]
    if (!o1.collider) {
      continue
    }

    for (let j = i + 1; j < eng.objs.length; j++) {
      const o2 = eng.objs[j]
      if (!o2.collider) {
        continue
      }

      _testCollision(o1, o2)
    }
  }
}

const _testCollision = (o1, o2) => {
  const c1 = o1.collider
  const c2 = o2.collider

  const dx = c2.x - c1.x
  const dy = c2.y - c1.y
  const radiiSum = c1.radius + c2.radius

  const distSq = dx * dx + dy * dy
  const radiiSq = radiiSum * radiiSum

  // skip polygon intersection check if not within each other's radius
  if (distSq > radiiSq) {
    return
  }

  if (ConvexPoly.intersects(c1, c2)) {
    if (o1.onCollision) {
      o1.onCollision(o2)
    }

    if (o2.onCollision) {
      o2.onCollision(o1)
    }
  }
}

export default {
  create,
  getObject,
  addObject,
  removeObject,
  onKeyUp,
  onKeyDown,
  onMouseMove,
  addKeyUpListener,
  addKeyDownListener,
  drawFrame,
  suspend,
  resume
}
