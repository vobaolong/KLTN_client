const API = process.env.REACT_APP_API_URL;

//user level
export const getUserLevel = (userId) => {
    return fetch(`${API}/user/level/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

export const listUserLevels = (userId, token, filter) => {
    const { search, sortBy, order, limit, page } = filter;
    return fetch(
        `${API}/user/levels/${userId}?search=${search}&sortBy=${sortBy}&order=${order}&limit=${limit}&page=${page}`,
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

export const createUserLevel = (userId, token, level) => {
    return fetch(`${API}/user/level/create/${userId}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(level),
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

export const updateUserLevel = (userId, token, levelId, level) => {
    return fetch(`${API}/user/level/${levelId}/${userId}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(level),
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

export const deleteUserLevel = (userId, token, levelId) => {
    return fetch(`${API}/user/level/${levelId}/${userId}`, {
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

export const restoreUserLevel = (userId, token, levelId) => {
    return fetch(`${API}/user/level/restore/${levelId}/${userId}`, {
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

// store level
export const getStoreLevel = (storeId) => {
    return fetch(`${API}/store/level/${storeId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

export const listStoreLevels = (userId, token, filter) => {
    const { search, sortBy, order, limit, page } = filter;
    return fetch(
        `${API}/store/levels/${userId}?search=${search}&sortBy=${sortBy}&order=${order}&limit=${limit}&page=${page}`,
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

export const createStoreLevel = (userId, token, level) => {
    return fetch(`${API}/store/level/create/${userId}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(level),
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

export const updateStoreLevel = (userId, token, levelId, level) => {
    return fetch(`${API}/store/level/${levelId}/${userId}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(level),
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

export const deleteStoreLevel = (userId, token, levelId) => {
    return fetch(`${API}/store/level/${levelId}/${userId}`, {
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

export const restoreStoreLevel = (userId, token, levelId) => {
    return fetch(`${API}/store/level/restore/${levelId}/${userId}`, {
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
