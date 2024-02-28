export const sameDate = (a, b) => {
  a = new Date(a)
  b = new Date(b)

  return (
    a.getFullYear() === b.getFullYear() &&
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth()
  )
}

export const sameMonth = (a, b) => {
  a = new Date(a)
  b = new Date(b)

  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth()
}

export const sameYear = (a, b) => {
  a = new Date(a)
  b = new Date(b)

  return a.getFullYear() === b.getFullYear()
}
