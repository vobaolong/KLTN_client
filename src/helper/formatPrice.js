export const formatPrice = (price) =>
  new Intl.NumberFormat('de-DE').format(price)

export const convertVNDtoUSD = (price) =>
  (parseFloat(price) * 0.00004).toFixed(2)
