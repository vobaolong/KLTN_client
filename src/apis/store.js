const API = process.env.REACT_APP_API_URL;

// profile
export const getStoreProfile = (userId, token, storeId) => {
    return fetch(`${API}/store/profile/${storeId}/${userId}`, {
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

export const updateProfile = (userId, token, store, storeId) => {
    return fetch(`${API}/store/${storeId}/${userId}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(store),
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

export const getStore = (storeId) => {
    return fetch(`${API}/store/${storeId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

// list store
export const getlistStores = (filter) => {
    const { search, sortBy, sortMoreBy, order, limit, page, isActive } = filter;
    return fetch(
        `${API}/stores?search=${search}&isActive=${isActive}&sortBy=${sortBy}&sortMoreBy=${sortMoreBy}&order=${order}&limit=${limit}&page=${page}`,
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

export const listStoresByUser = (userId, token, filter) => {
    const { search, sortBy, order, limit, page } = filter;
    return fetch(
        `${API}/stores/by/user/${userId}?search=${search}&sortBy=${sortBy}&order=${order}&limit=${limit}&page=${page}`,
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

export const listStoresForAdmin = (userId, token, filter) => {
    const { search, sortBy, sortMoreBy, order, isActive, limit, page } = filter;
    return fetch(
        `${API}/stores/for/admin/${userId}?search=${search}&sortBy=${sortBy}&sortMoreBy=${sortMoreBy}&isActive=${isActive}&order=${order}&limit=${limit}&page=${page}`,
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

//create store
export const createStore = (userId, token, store) => {
    return fetch(`${API}/store/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: store,
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

// avatar
export const updateAvatar = (userId, token, photo, storeId) => {
    return fetch(`${API}/store/avatar/${storeId}/${userId}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: photo,
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

//cover
export const updateCover = (userId, token, photo, storeId) => {
    return fetch(`${API}/store/cover/${storeId}/${userId}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: photo,
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

//featured images
export const addFeaturedImage = (userId, token, photo, storeId) => {
    return fetch(`${API}/store/featured/image/${storeId}/${userId}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: photo,
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

export const updateFeaturedImage = (userId, token, photo, index, storeId) => {
    return fetch(
        `${API}/store/featured/image/${storeId}/${userId}?index=${index}`,
        {
            method: 'PUT',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: photo,
        },
    )
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

export const removeFeaturedImage = (userId, token, index, storeId) => {
    return fetch(
        `${API}/store/featured/image/${storeId}/${userId}?index=${index}`,
        {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
        },
    )
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

//staffs
export const addStaffs = (userId, token, staffs, storeId) => {
    return fetch(`${API}/store/staffs/${storeId}/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ staffs }),
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

export const deleteStaff = (userId, token, staff, storeId) => {
    return fetch(`${API}/store/staff/remove/${storeId}/${userId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ staff }),
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

export const cancelStaff = (userId, token, storeId) => {
    return fetch(`${API}/store/staff/cancel/${storeId}/${userId}`, {
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

//openStore
export const openStore = (userId, token, value, storeId) => {
    return fetch(`${API}/store/open/${storeId}/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(value),
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

//activeStore
export const activeStore = (userId, token, value, storeId) => {
    return fetch(`${API}/store/active/${storeId}/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(value),
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};
