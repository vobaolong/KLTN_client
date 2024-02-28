const API = process.env.REACT_APP_API_URL;

export const listReviews = (filter) => {
    const { productId, storeId, userId, rating, sortBy, order, limit, page } =
        filter;

    return fetch(
        `${API}/reviews?productId=${productId}&storeId=${storeId}&userId=${userId}&rating=${rating}&sortBy=${sortBy}&order=${order}&limit=${limit}&page=${page}`,
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

export const checkReview = (userId, token, data) => {
    return fetch(`${API}/review/check/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

export const reviewProduct = (userId, token, review) => {
    return fetch(`${API}/review/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(review),
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

export const editReview = (userId, token, review, reviewId) => {
    return fetch(`${API}/review/${reviewId}/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(review),
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

export const removeReview = (userId, token, reviewId) => {
    return fetch(`${API}/review/${reviewId}/${userId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};
