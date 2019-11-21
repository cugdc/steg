import ConvexPoly from './ConvexPoly.js'

const create = (canvas, width, height) => ({
  suspended: false,
  canvas,
  ctx: canvas.getContext('2d', { alpha: false }),
  //frame: { w: () => canvas.width, h: () => canvas.height }, // TODO remove this
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
  // XXX hack: let's do better than using Math.random() for random id's
  obj.$eng$id = id || (Math.random() + '.eng-gen-id')
  eng.objs = [obj, ...eng.objs]
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
  eng.objs.filter(o => !!o.onMouseMove).forEach(o => o.onMouseMove(eng, x, y))
}

const onMouseDown = (eng, x, y) => {
  eng.objs.filter(o => !!o.onMouseDown).forEach(o => o.onMouseDown(eng, x, y))
}

const onMouseUp = (eng, x, y) => {
  eng.objs.filter(o => !!o.onMouseUp).forEach(o => o.onMouseUp(eng, x, y))
}

const addKeyUpListener = (eng, listener) => {
  eng.listeners.keyUp.push(listener)
}

const addKeyDownListener = (eng, listener) => {
  eng.listeners.keyDown.push(listener)
}

const intersectsAnyCollider = (eng, x, y) => {
  const colliders = eng.objs.reduce((acc, o) => (o.collider ? [o.collider, ...acc] : acc), [])

  for (const c of colliders) {
    const dx = c.x - x
    const dy = c.y - y
    const dist = Math.sqrt(dx * dx + dy * dy)

    // dist - rad > 0 implies outside of collider's "circle"
    if (dist - c.radius <= 0) {
      if (ConvexPoly.contains(c, [x, y])) {
        return true
      }
    }
  }

  return false
}

const drawFrame = (eng) => {
  const { ctx, frame, canvas, width, height, objs } = eng

  eng.frames++
  eng.updates++

  _checkCollisions(eng)
  eng.objs.filter(o => !!o.update).forEach(o => o.update(eng))

  if (!eng._epoch) {
    eng._epoch = Date.now()
  }

  ctx.fillStyle = '#171717'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.save()
  ctx.scale(canvas.width / width, canvas.height / height)
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
  onMouseDown,
  onMouseUp,
  addKeyUpListener,
  addKeyDownListener,
  intersectsAnyCollider,
  drawFrame,
  suspend,
  resume
}
