// export const totalProducts = (items = [], userLevel = {}) => {
// 	let totalPrice, totalSalePrice, amountFromUser1

// 	try {
// 		totalPrice = items.reduce(
// 			(prev, item) =>
// 				parseFloat(prev) +
// 				parseFloat(item.productId.price.$numberDecimal) *
// 				parseFloat(item.count),
// 			0
// 		)
// 	} catch (e) {
// 		totalPrice = 0
// 	}

// 	try {
// 		totalSalePrice = items.reduce(
// 			(prev, item) =>
// 				parseFloat(prev) +
// 				parseFloat(item.productId.salePrice.$numberDecimal) *
// 				parseFloat(item.count),
// 			0
// 		)
// 	} catch (e) {
// 		totalSalePrice = 0
// 	}

// 	try {
// 		amountFromUser1 =
// 			(totalSalePrice * (100 - parseFloat(userLevel.discount.$numberDecimal))) /
// 			100
// 	} catch (e) {
// 		amountFromUser1 = totalSalePrice
// 	}

// 	return {
// 		totalPrice,
// 		totalSalePrice,
// 		amountFromUser1
// 	}
// }

// export const totalDelivery = (delivery = {}, userLevel = {}) => {
// 	let deliveryPrice, amountFromUser2

// 	try {
// 		deliveryPrice = delivery.price.$numberDecimal
// 	} catch (e) {
// 		deliveryPrice = 0
// 	}

// 	try {
// 		amountFromUser2 =
// 			(deliveryPrice * (100 - parseFloat(userLevel.discount.$numberDecimal))) /
// 			100
// 	} catch (e) {
// 		amountFromUser2 = deliveryPrice
// 	}

// 	return {
// 		deliveryPrice,
// 		amountFromUser2
// 	}
// }

// export const totalCommission = (
// 	items = {},
// 	storeLevel = {},
// 	commission = {}
// ) => {
// 	let totalPrice, totalSalePrice, amountFromStore, amountToStore

// 	try {
// 		totalPrice = items.reduce(
// 			(prev, item) =>
// 				parseFloat(prev) +
// 				parseFloat(item.productId.price.$numberDecimal) *
// 				parseFloat(item.count),
// 			0
// 		)
// 	} catch (e) {
// 		totalPrice = 0
// 	}

// 	try {
// 		totalSalePrice = items.reduce(
// 			(prev, item) =>
// 				parseFloat(prev) +
// 				parseFloat(item.productId.salePrice.$numberDecimal) *
// 				parseFloat(item.count),
// 			0
// 		)
// 	} catch (e) {
// 		totalSalePrice = 0
// 	}

// 	try {
// 		amountFromStore =
// 			(totalSalePrice *
// 				(parseFloat(commission.cost.$numberDecimal) -
// 					parseFloat(storeLevel.discount.$numberDecimal))) /
// 			100
// 	} catch (e) {
// 		amountFromStore = 0
// 	}

// 	amountToStore = totalSalePrice - amountFromStore

// 	return {
// 		totalPrice,
// 		totalSalePrice,
// 		amountFromStore,
// 		amountToStore
// 	}
// }
export const totalProducts = (items = [], userLevel = {}) => {
	let totalPrice = 0;
	let totalSalePrice = 0;
	let amountFromUser1 = 0;

	totalPrice = items.reduce((prev, item) => prev + parseFloat(item.productId.price?.$numberDecimal || 0) * parseFloat(item.count), 0);

	totalSalePrice = items.reduce((prev, item) => prev + parseFloat(item.productId.salePrice?.$numberDecimal || 0) * parseFloat(item.count), 0);

	amountFromUser1 = (totalSalePrice * (100 - parseFloat(userLevel.discount?.$numberDecimal || 0))) / 100 || totalSalePrice;

	return { totalPrice, totalSalePrice, amountFromUser1 };
};

export const totalDelivery = (delivery = {}, userLevel = {}) => {
	const deliveryPrice = parseFloat(delivery.price?.$numberDecimal || 0);
	const amountFromUser2 = (deliveryPrice * (100 - parseFloat(userLevel.discount?.$numberDecimal || 0))) / 100 || deliveryPrice;

	return { deliveryPrice, amountFromUser2 };
};

export const totalCommission = (items = {}, storeLevel = {}, commission = {}) => {
	let totalPrice = 0;
	let totalSalePrice = 0;
	let amountFromStore = 0;
	let amountToStore = 0;

	totalPrice = items.reduce((prev, item) => prev + parseFloat(item.productId.price?.$numberDecimal || 0) * parseFloat(item.count), 0);

	totalSalePrice = items.reduce((prev, item) => prev + parseFloat(item.productId.salePrice?.$numberDecimal || 0) * parseFloat(item.count), 0);

	amountFromStore = (totalSalePrice * (parseFloat(commission.cost?.$numberDecimal || 0) - parseFloat(storeLevel.discount?.$numberDecimal || 0))) / 100 || 0;

	amountToStore = totalSalePrice - amountFromStore;

	return { totalPrice, totalSalePrice, amountFromStore, amountToStore };
};
