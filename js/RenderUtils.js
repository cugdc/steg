export const drawLife = (ctx, x, y, rot, color, isAggroCb) => {
  // TODO: use color var

  // Body
  ctx.save()
  {
    ctx.fillStyle = '#696'
    ctx.strokeStyle = '#363'
    ctx.beginPath()
    ctx.arc(x, y, 15, 0, 2 * Math.PI)
    ctx.fill()
    ctx.stroke()
  }
  ctx.restore()

  // Eye
  ctx.save()
  {
    ctx.strokeStyle = '#fff'
    ctx.beginPath()

    const r = 4 // eye radius
    const d = 9 // distance from body
    const eyeX = x + (r + d) * Math.cos(rot)
    const eyeY = y + (r + d) * Math.sin(rot)
    ctx.arc(eyeX, eyeY, r, 0, 2 * Math.PI)

    if (isAggroCb && isAggroCb()) {
      ctx.lineWidth = 2
      ctx.fillStyle = '#141'
    } else {
      ctx.fillStyle = '#363'
    }

    ctx.fill()
    ctx.stroke()
  }
  ctx.restore()
}

export const drawTriangle = (ctx, t, getColor) => {
  ctx.save()
  {
    ctx.strokeStyle = getColor()
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(t.a[0], t.a[1])
    ctx.lineTo(t.b[0], t.b[1])
    ctx.lineTo(t.c[0], t.c[1])
    ctx.closePath()
    ctx.stroke()
  }
  ctx.restore()
}
