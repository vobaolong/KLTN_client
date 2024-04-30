export const randomColor = (() => {
  const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  return () => {
    var r = randomInt(100, 255)
    var g = randomInt(100, 255)
    var b = randomInt(100, 255)
    var a = (Math.random() * 0.5 + 0.5).toFixed(2)

    return `rgba(${r},${g},${b},${a})`
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
