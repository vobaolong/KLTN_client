import { refreshTokenApi, getToken } from './auth'
const API = process.env.REACT_APP_API_URL
const jwt = require('jsonwebtoken')

//user
export const getUser = async (userId) => {
  try {
    const res = await fetch(`${API}/user/${userId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    return await res.json()
  } catch (error) {
    return console.log(error)
  }
}

//list user
export const getListUsers = async (filter) => {
  const { search, sortBy, order, limit, page, role } = filter

  try {
    const res = await fetch(
      `${API}/users?search=${search}&role=${role}&sortBy=${sortBy}&order=${order}&limit=${limit}&page=${page}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
    return await res.json()
  } catch (error) {
    return console.log(error)
  }
}

export const listUserForAdmin = async (userId, token, filter) => {
  const { search, sortBy, order, limit, page, role } = filter

  try {
    const res = await fetch(
      `${API}/users/for/admin/${userId}?search=${search}&role=${role}&sortBy=${sortBy}&order=${order}&limit=${limit}&page=${page}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )
    return await res.json()
  } catch (error) {
    return console.log(error)
  }
}

// profile
export const getUserProfile = async (userId, token) => {
  //user validate
  const { refreshToken, _id, role } = getToken()
  const decoded = jwt.decode(token)
  const timeout = (decoded.exp - 60) * 1000 - Date.now().valueOf()
  setTimeout(() => refreshTokenApi(refreshToken, _id, role), timeout)

  // getuser
  return fetch(`${API}/user/profile/${userId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
    .then((res) => res.json())
    .catch((error) => console.log(error))
}

export const updateProfile = async (userId, token, user) => {
  try {
    const res = await fetch(`${API}/user/profile/${userId}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(user)
    })
    return await res.json()
  } catch (error) {
    return console.log(error)
  }
}

//avatar
export const updateAvatar = async (userId, token, photo) => {
  try {
    const res = await fetch(`${API}/user/avatar/${userId}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: photo
    })
    return await res.json()
  } catch (error) {
    return console.log(error)
  }
}

//cover
export const updateCover = async (userId, token, photo) => {
  try {
    const res = await fetch(`${API}/user/cover/${userId}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: photo
    })
    return await res.json()
  } catch (error) {
    return console.log(error)
  }
}

//password
export const updatePassword = async (userId, token, user) => {
  try {
    const res = await fetch(`${API}/user/password/${userId}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(user)
    })
    return await res.json()
  } catch (error) {
    return console.log(error)
  }
}

//address
export const addAddress = async (userId, token, address) => {
  try {
    const res = await fetch(`${API}/user/address/${userId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(address)
    })
    return await res.json()
  } catch (error) {
    return console.log(error)
  }
}

export const deleteAddresses = async (userId, token, index) => {
  try {
    const res = await fetch(`${API}/user/address/${userId}?index=${index}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    return await res.json()
  } catch (error) {
    return console.log(error)
  }
}

export const updateAddress = async (userId, token, index, address) => {
  try {
    const res = await fetch(`${API}/user/address/${userId}?index=${index}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(address)
    })
    return await res.json()
  } catch (error) {
    return console.log(error)
  }
}
