export const addProduct = (product) => {
    return {
        type: 'ADD_PRODUCT',
        payload: product,
    };
};
