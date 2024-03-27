export const calcPercent = (price = {}, salePrice = {}) => {
	let salePercent = Math.round(
		((price.$numberDecimal - salePrice.$numberDecimal) / price.$numberDecimal) *
		100
	)
	return salePercent
}
