const API = process.env.REACT_APP_API_URL

//localStorage token
export const setToken = (data, next) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('jwt', JSON.stringify(data))
    next()
  }
}

export const getToken = () => {
  if (typeof window == 'undefined') {
    return false
  }

  if (localStorage.getItem('jwt')) {
    return JSON.parse(localStorage.getItem('jwt'))
  }
  return false
}

export const removeToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('jwt')
  }
}

export const refreshTokenApi = async (refreshToken, userId, role) => {
  try {
    const res = await fetch(`${API}/refresh/token`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ refreshToken })
    })
    const data = await res.json()
    if (data.error) {
      signout(refreshToken, () => {})
    } else {
      console.log('setToken')
      setToken(
        {
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          _id: userId,
          role
        },
        () => {}
      )
    }
  } catch (error) {
    signout(refreshToken, () => {})
  }
}

//auth apis
export const signup = async (user) => {
  try {
    const res = await fetch(`${API}/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    return await res.json()
  } catch (error) {
    return console.log(error)
  }
}

export const signin = async (user) => {
  try {
    const res = await fetch(`${API}/signin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    return await res.json()
  } catch (error) {
    return console.error(error)
  }
}

export const signout = (refreshToken, next) => {
  fetch(`${API}/signout`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ refreshToken })
  })

  removeToken()
  next()
}

export const authSocial = async (user) => {
  try {
    const res = await fetch(`${API}/auth/social`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    return await res.json()
  } catch (error) {
    return console.error(error)
  }
}

export const sendConfirmationEmail = async (userId, token) => {
  try {
    const res = await fetch(`${API}/confirm/email/${userId}`, {
      method: 'GET',
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

export const verifyEmail = async (emailCode) => {
  try {
    const res = await fetch(`${API}/verify/email/${emailCode}`, {
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

export const forgotPassword = async (username) => {
  try {
    const res = await fetch(`${API}/forgot/password`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(username)
    })
    return await res.json()
  } catch (error) {
    return console.log(error)
  }
}

export const changePassword = async (passwordCode, newPassword) => {
  try {
    const res = await fetch(`${API}/change/password/${passwordCode}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPassword)
    })
    return await res.json()
  } catch (error) {
    return console.log(error)
  }
}
