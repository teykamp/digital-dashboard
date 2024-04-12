const hexToRGBA = (hex: string, alpha: number = 1) => {
  const [r, g, b] = hex.match(/\w\w/g)!.map((x: string) => parseInt(x, 16))
  return `rgba(${r},${g},${b},${alpha})`
}

export default hexToRGBA