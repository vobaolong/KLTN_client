const API = process.env.REACT_APP_API_URL;

export const getOrderByUser = (userId, token, orderId) => {
    return fetch(`${API}/order/by/user/${orderId}/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

export const getOrderByStore = (userId, token, orderId, storeId) => {
    return fetch(`${API}/order/by/store/${orderId}/${storeId}/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

export const getOrderForAdmin = (userId, token, orderId) => {
    return fetch(`${API}/order/for/admin/${orderId}/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

export const createOrder = (userId, token, cartId, order) => {
    return fetch(`${API}/order/create/${cartId}/${userId}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(order),
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

export const listItemsByOrder = (userId, token, orderId) => {
    return fetch(`${API}/order/items/by/user/${orderId}/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

export const listItemsByOrderByStore = (userId, token, orderId, storeId) => {
    return fetch(
        `${API}/order/items/by/store/${orderId}/${storeId}/${userId}`,
        {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        },
    )
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

export const listItemsByOrderForAdmin = (userId, token, orderId) => {
    return fetch(`${API}/order/items/for/admin/${orderId}/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

export const listOrdersByUser = (userId, token, filter) => {
    const { search, sortBy, order, limit, page, status } = filter;
    return fetch(
        `${API}/orders/by/user/${userId}?search=${search}&status=${status}&sortBy=${sortBy}&order=${order}&limit=${limit}&page=${page}`,
        {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        },
    )
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

export const listOrdersByStore = (userId, token, filter, storeId) => {
    const { search, sortBy, order, limit, page, status } = filter;
    return fetch(
        `${API}/orders/by/store/${storeId}/${userId}?search=${search}&status=${status}&sortBy=${sortBy}&order=${order}&limit=${limit}&page=${page}`,
        {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        },
    )
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

export const listOrdersForAdmin = (userId, token, filter) => {
    const { search, sortBy, order, limit, page, status } = filter;
    return fetch(
        `${API}/orders/for/admin/${userId}?search=${search}&status=${status}&sortBy=${sortBy}&order=${order}&limit=${limit}&page=${page}`,
        {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        },
    )
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

export const userCancelOrder = (userId, token, status, orderId) => {
    return fetch(`${API}/order/update/by/user/${orderId}/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(status),
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

export const vendorUpdateStatusOrder = (
    userId,
    token,
    status,
    orderId,
    storeId,
) => {
    return fetch(
        `${API}/order/update/by/store/${orderId}/${storeId}/${userId}`,
        {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(status),
        },
    )
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

export const adminUpdateStatusOrder = (userId, token, status, orderId) => {
    return fetch(`${API}/order/update/for/admin/${orderId}/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(status),
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

export const countOrder = (status, userId, storeId) => {
    return fetch(
        `${API}/orders/count?status=${status}&userId=${userId}&storeId=${storeId}`,
        {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        },
    )
        .then((res) => res.json())
        .catch((error) => console.log(error));
};
