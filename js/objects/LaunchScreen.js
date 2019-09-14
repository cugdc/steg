const draw = function({ ctx, width, height, elapsed }) {
  let image = ctx.createImageData(width, height)
  let buf = new Uint32Array(image.data.buffer)

  const stride = 25 // roughly how wide the x-bars are
  for (let i = 0; i < buf.length; i += stride) {
    const px = Math.random() > 1 / 6 ? -1 : 0
    for (let j = 0; j < stride && j + i < buf.length; j++) {
      buf[i + j] = px
    }
  }

  ctx.putImageData(image, 0, 0)

  // "Zombruh" text
  let x = width * 0.05
  let y = width * 0.5
  ctx.font = '100px monospace'

  let text = 'Zombruh'
  if (this.egg) {
    text = 'Super ' + text.replace('ruh', 'io Bros.')
    ctx.font = '3' + ctx.font.substring(2)
  }

  // Green text
  ctx.fillStyle = !this.egg ? '#696' : '#faa'
  ctx.fillText(text, x, y)

  // Moving outline
  let xOff = 3 * Math.cos(elapsed / 100)
  let yOff = 6 * Math.tan(elapsed / 1000)
  ctx.strokeStyle = '#000'
  ctx.strokeText(text, xOff + x, yOff + y)
}

export default (id) => ({
  id,
  egg: Math.random() < 0.03,
  draw
})
