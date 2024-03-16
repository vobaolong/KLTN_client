const months = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12'
]

export const humanReadableDate = (date) => {
  date = new Date(date)
  const hours = ('0' + date.getHours()).slice(-2)
  const minutes = ('0' + date.getMinutes()).slice(-2)
  const day = ('0' + date.getDate()).slice(-2)
  const month = ('0' + (date.getMonth() + 1)).slice(-2)
  return (
    hours + ':' + minutes + ' ' + day + '/' + month + '/' + date.getFullYear()
  )
}
export const calculateDaysDifference = (date) => {
  const today = new Date()
  const createdDate = new Date(date)

  const differenceInMilliseconds = today.getTime() - createdDate.getTime()

  const differenceInDays = Math.floor(
    differenceInMilliseconds / (1000 * 60 * 60 * 24)
  )

  return differenceInDays
}

export const formatDate = (date) => {
  return (
    new Date(date).getDate() +
    '/' +
    new Date(date).getMonth() +
    '/' +
    new Date(date).getFullYear()
  )
}

export const formatMonth = (date) => {
  return new Date(date).getMonth() + '/' + new Date(date).getFullYear()
}

export const formatYear = (date) => {
  return new Date(date).getFullYear()
}

export const formatTime = (date) => {
  date = new Date(date)
  return (
    date.getHours() +
    'h ' +
    date.getDate() +
    '/' +
    months[date.getMonth()] +
    '/' +
    date.getFullYear()
  )
}
