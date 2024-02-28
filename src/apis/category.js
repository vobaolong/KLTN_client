const API = process.env.REACT_APP_API_URL;

export const getCategoryById = (categoryId) => {
    return fetch(`${API}/category/by/id/${categoryId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

export const listActiveCategories = (filter) => {
    const { search, sortBy, order, limit, page, categoryId } = filter;
    return fetch(
        `${API}/active/categories?search=${search}&categoryId=${categoryId}&sortBy=${sortBy}&order=${order}&limit=${limit}&page=${page}`,
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

export const listCategories = (userId, token, filter) => {
    const { search, sortBy, order, limit, page, categoryId } = filter;
    return fetch(
        `${API}/categories/${userId}?search=${search}&categoryId=${categoryId}&sortBy=${sortBy}&order=${order}&limit=${limit}&page=${page}`,
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

export const createCategory = (userId, token, category) => {
    return fetch(`${API}/category/create/${userId}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: category,
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

export const updateCategory = (userId, token, categoryId, category) => {
    return fetch(`${API}/category/${categoryId}/${userId}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: category,
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

export const deleteCategory = (userId, token, categoryId) => {
    return fetch(`${API}/category/${categoryId}/${userId}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

export const restoreCategory = (userId, token, categoryId) => {
    return fetch(`${API}/category/restore/${categoryId}/${userId}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};
