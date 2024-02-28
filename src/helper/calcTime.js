export const calcTime = (from) => {
  const time = new Date().getTime() - new Date(from).getTime()
  const hours = Math.floor(time / 1000) / 3600
  return hours
}
