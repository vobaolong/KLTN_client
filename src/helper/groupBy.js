import {
  formatDate,
  formatMonth,
  formatYear,
  formatTime
} from './humanReadable'

export const groupByDate = (items, by, role) => {
  let formatFunc = formatTime
  if (by === 'date') formatFunc = formatDate
  if (by === 'month') formatFunc = formatMonth
  if (by === 'year') formatFunc = formatYear

  return items
    ?.map((item) => {
      if (role === 'admin') {
        return {
          amount: parseFloat(item.amountToZenpii.$numberDecimal),
          createdAt: formatFunc(item.createdAt)
        }
      } else {
        return {
          amountToStore: parseFloat(item.amountToStore.$numberDecimal),
          amountToZenpii: parseFloat(item.amountToZenpii.$numberDecimal),
          createdAt: formatFunc(item.createdAt)
        }
      }
    })
    ?.reduce((acc, value) => {
      let i = 0
      let flag = false

      while (i < acc.length) {
        if (acc[i][0] === value.createdAt) {
          if (role === 'admin') {
            acc[i][1] += value.amount
          } else {
            acc[i][1] += value.amountToStore
            acc[i][2] += value.amountToZenpii
          }
          flag = true
          i = acc.length
        } else i++
      }

      if (!flag) {
        if (role === 'admin') {
          acc.push([value.createdAt, value.amount])
        } else {
          acc.push([value.createdAt, value.amountToStore, value.amountToZenpii])
        }
      }
      return acc
    }, [])
}

export const groupByJoined = (items, by) => {
  let formatFunc = formatTime
  if (by === 'date') formatFunc = formatDate
  if (by === 'month') formatFunc = formatMonth
  if (by === 'year') formatFunc = formatYear

  return items
    .sort((a, b) => a.createdAt - b.createdAt)
    .map((item) => {
      return {
        createdAt: formatFunc(item.createdAt)
      }
    })
    .reduce((acc, value) => {
      let i = 0
      let flag = false

      while (i < acc.length) {
        if (acc[i][0] === value.createdAt) {
          acc[i][1] += 1
          flag = true
          i = acc.length
        } else i++
      }

      if (!flag) acc.push([value.createdAt, 1])
      return acc
    }, [])
}

export const groupBySold = (items, by, role, sliceEnd) => {
  return items
    .slice(0, sliceEnd)
    .map((item) => {
      return {
        name: item.name,
        sold: item.sold
      }
    })
    .reduce((acc, value) => {
      let i = 0
      let flag = false

      while (i < acc.length) {
        if (acc[i][0] === value.name) {
          acc[i][1] = parseFloat(acc[i][1]) + parseFloat(value.sold)
          flag = true
          i = acc.length
        } else i++
      }

      if (!flag) acc.push([value.name, value.sold])
      return acc
    }, [])
}
