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
// const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export const humanReadableDate = (date) => {
  date = new Date(date)
  return (
    date.getHours() +
    ':' +
    date.getMinutes() +
    ' ' +
    date.getDate() +
    '/' +
    months[date.getMonth()] +
    '/' +
    date.getFullYear()
    // days[date.getDay()] +
    // ' ' +
  )
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
    // days[date.getDay()] +
    // ' ' +
  )
}
