export const randomColor = (() => {
  const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  return () => {
    var h = randomInt(0, 360)
    var s = randomInt(42, 98)
    var l = randomInt(40, 90)
    return `hsl(${h},${s}%,${l}%)`
  }
})()

export const randomColorsArray = (count) => {
  let colors = []
  for (let i = 0; i < count; ) {
    const color = randomColor()
    if (colors.indexOf(color) === -1) {
      colors.push(color)
      i++
    }
  }

  return colors
}
