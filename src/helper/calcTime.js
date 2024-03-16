export const calcTime = (from) => {
  const timeDiff = new Date().getTime() - new Date(from).getTime()
  const hours = timeDiff / (1000 * 3600)
  return hours
}
