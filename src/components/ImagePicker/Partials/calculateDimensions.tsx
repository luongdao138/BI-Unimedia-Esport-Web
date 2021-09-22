export const calculateDimensions = (width: number, height: number, S_W: number, S_H: number): { height: number; width: number } => {
  let h = height,
    w = width
  if (w <= h && w < S_W) {
    const gap = S_W / w
    w = S_W
    h = h * gap
  } else if (h < w && h < S_H) {
    const gap = S_H / h
    h = S_H
    w = w * gap
  } else if (h > S_H && w > S_W) {
    let gap = 0
    if (h > w) {
      gap = w / S_W
      w = S_W
      h = h / gap
    } else {
      gap = h / S_H
      h = S_H
      w = w / gap
    }
  }
  return { height: h, width: w }
}

export const calculateDimensionsCover = (width: number, height: number, S_W: number, S_H: number): { height: number; width: number } => {
  let h = height,
    w = width,
    gap = S_W / w
  w = S_W
  h = h * gap
  if (h * 4 < w) {
    gap = S_H / h
    h = S_H
    w = w * gap
  }
  return { height: h, width: w }
}

export const calculateDimensionsThumbStream = (
  width: number,
  height: number,
  S_W: number,
  S_H: number
): { height: number; width: number } => {
  let h = height,
    w = width,
    gap = S_W / w
  w = S_W
  h = h * gap
  if (h * 16 < w * 9) {
    gap = S_H / h
    h = S_H
    w = w * gap
  }
  return { height: h, width: w }
}
