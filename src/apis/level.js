const API = process.env.REACT_APP_API_URL

//user level
export const getUserLevel = async (userId) => {
  try {
    const res = await fetch(`${API}/user/level/${userId}`, {
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

export const listUserLevels = async (userId, token, filter) => {
  const { search, sortBy, order, limit, page } = filter
  try {
    const res = await fetch(
      `${API}/user/levels/${userId}?search=${search}&sortBy=${sortBy}&order=${order}&limit=${limit}&page=${page}`,
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

export const createUserLevel = async (userId, token, level) => {
  try {
    const res = await fetch(`${API}/user/level/create/${userId}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(level)
    })
    return await res.json()
  } catch (error) {
    return console.log(error)
  }
}

export const updateUserLevel = async (userId, token, levelId, level) => {
  try {
    const res = await fetch(`${API}/user/level/${levelId}/${userId}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(level)
    })
    return await res.json()
  } catch (error) {
    return console.log(error)
  }
}

export const deleteUserLevel = async (userId, token, levelId) => {
  try {
    const res = await fetch(`${API}/user/level/${levelId}/${userId}`, {
      method: 'DELETE',
      mode: 'cors',
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

export const restoreUserLevel = async (userId, token, levelId) => {
  try {
    const res = await fetch(`${API}/user/level/restore/${levelId}/${userId}`, {
      method: 'GET',
      mode: 'cors',
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

// store level
export const getStoreLevel = async (storeId) => {
  try {
    const res = await fetch(`${API}/store/level/${storeId}`, {
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

export const listStoreLevels = async (userId, token, filter) => {
  const { search, sortBy, order, limit, page } = filter
  try {
    const res = await fetch(
      `${API}/store/levels/${userId}?search=${search}&sortBy=${sortBy}&order=${order}&limit=${limit}&page=${page}`,
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

export const createStoreLevel = async (userId, token, level) => {
  try {
    const res = await fetch(`${API}/store/level/create/${userId}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(level)
    })
    return await res.json()
  } catch (error) {
    return console.log(error)
  }
}

export const updateStoreLevel = async (userId, token, levelId, level) => {
  try {
    const res = await fetch(`${API}/store/level/${levelId}/${userId}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(level)
    })
    return await res.json()
  } catch (error) {
    return console.log(error)
  }
}

export const deleteStoreLevel = async (userId, token, levelId) => {
  try {
    const res = await fetch(`${API}/store/level/${levelId}/${userId}`, {
      method: 'DELETE',
      mode: 'cors',
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

export const restoreStoreLevel = async (userId, token, levelId) => {
  try {
    const res = await fetch(`${API}/store/level/restore/${levelId}/${userId}`, {
      method: 'GET',
      mode: 'cors',
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
