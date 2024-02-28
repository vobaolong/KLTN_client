const API = process.env.REACT_APP_API_URL;

//localStorage token
export const setToken = (data, next) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(data));
        next();
    }
};

export const getToken = () => {
    if (typeof window == 'undefined') {
        return false;
    }

    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'));
    }
    return false;
};

export const removeToken = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('jwt');
    }
};

export const refreshTokenApi = (refreshToken, userId, role) => {
    return fetch(`${API}/refresh/token`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.error) {
                signout(refreshToken, () => {});
            } else {
                console.log('setToken');
                setToken(
                    {
                        accessToken: data.accessToken,
                        refreshToken: data.refreshToken,
                        _id: userId,
                        role,
                    },
                    () => {},
                );
            }
        })
        .catch((error) => {
            signout(refreshToken, () => {});
        });
};

//auth apis
export const signup = (user) => {
    return fetch(`${API}/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

export const signin = (user) => {
    return fetch(`${API}/signin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
        .then((res) => res.json())
        .catch((error) => console.error(error));
};

export const signout = (refreshToken, next) => {
    fetch(`${API}/signout`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
    });

    removeToken();
    next();
};

export const authsocial = (user) => {
    return fetch(`${API}/auth/social`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
        .then((res) => res.json())
        .catch((error) => console.error(error));
};

//confirm email
export const sendConfirmationEmail = (userId, token) => {
    return fetch(`${API}/confirm/email/${userId}`, {
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

export const verifyEmail = (emailCode) => {
    return fetch(`${API}/verify/email/${emailCode}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

//forgot password
export const forgotPassword = (username) => {
    return fetch(`${API}/forgot/password`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(username),
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

export const changePassword = (passwordCode, newPassword) => {
    return fetch(`${API}/change/password/${passwordCode}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPassword),
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};
