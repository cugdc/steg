const blend = (c1, c2, bias) => {
  const c1_r = (c1 & 0xff0000) >> 16;
  const c2_r = (c2 & 0xff0000) >> 16;
  const c1_g = (c1 & 0xff00) >> 8;
  const c2_g = (c2 & 0xff00) >> 8;
  const c1_b = c1 & 0xff;
  const c2_b = c2 & 0xff;

  const opa = (1 - bias) / 2;

  const r = Math.floor(c1_r * opa + c2_r * (1 - opa));
  const g = Math.floor(c1_g * opa + c2_g * (1 - opa));
  const b = Math.floor(c1_b * opa + c2_b * (1 - opa));

  return (0xff << 24) | (r << 16) | (g << 8) | b;
}

const draw = function({ ctx, frame, width, height, updates }) {
  const w = frame.w()
  const h = frame.h()

  let image = ctx.createImageData(w, h)
  let buf = new Uint32Array(image.data.buffer)

  const stride = 1 // roughly how wide the x-bars are

  const magic = Math.floor(765 + 3 * Math.sin(updates / 30))
  const color = (i, k) => Math.floor(i * (magic + k) * 0x7f7f7f7f)
  const bias = (updates % 60) / 30 - 1

  for (let i = 0; i < buf.length; i++) {
    buf[i] = blend(color(i, 0), blend(color(i, -1), color(i, 1), bias), bias)
  }

  ctx.putImageData(image, 0, 0)

  // "Zombruh" text
  let x = width * 0.05
  let y = width * 0.5
  ctx.font = 'italic bold 100px arial'

  let text = 'Zombruh'

  ctx.fillStyle = '#ccc' 
  ctx.fillText(text, x, y)

  // Moving outline
  let xOff = 10 * Math.sin(updates / 40)
  let yOff = 2 * Math.tan(updates / 50)
  ctx.strokeStyle = '#622'
  ctx.lineWidth = 3
  ctx.strokeText(text, xOff + x, yOff + y)
}

export default () => ({ draw })
