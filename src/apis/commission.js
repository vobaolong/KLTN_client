const API = process.env.REACT_APP_API_URL;

export const listActiveCommissions = () => {
    return fetch(`${API}/active/commissions`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

export const listCommissions = (userId, token, filter) => {
    const { search, sortBy, order, limit, page } = filter;
    return fetch(
        `${API}/commissions/${userId}?search=${search}&sortBy=${sortBy}&order=${order}&limit=${limit}&page=${page}`,
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

export const getCommissionByStore = (storeId) => {
    return fetch(`${API}/store/commission/${storeId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

export const createCommission = (userId, token, commission) => {
    return fetch(`${API}/commission/create/${userId}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(commission),
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

export const updateCommission = (userId, token, commissionId, commission) => {
    return fetch(`${API}/commission/${commissionId}/${userId}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(commission),
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

export const deleteCommission = (userId, token, commissionId) => {
    return fetch(`${API}/commission/${commissionId}/${userId}`, {
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

export const restoreCommission = (userId, token, commissionId) => {
    return fetch(`${API}/commission/restore/${commissionId}/${userId}`, {
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
