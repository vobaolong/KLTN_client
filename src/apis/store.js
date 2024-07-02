const API = process.env.REACT_APP_API_URL

export const getStoreProfile = async (userId, token, storeId) => {
  try {
    const res = await fetch(`${API}/store/profile/${storeId}/${userId}`, {
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

export const updateProfile = async (userId, token, store, storeId) => {
  try {
    const res = await fetch(`${API}/store/${storeId}/${userId}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(store)
    })
    return await res.json()
  } catch (error) {
    return console.log(error)
  }
}

export const getStore = async (storeId) => {
  try {
    const res = await fetch(`${API}/store/${storeId}`, {
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

export const getListStores = async (filter) => {
  const { search, sortBy, sortMoreBy, order, limit, page, isActive } = filter
  try {
    const res = await fetch(
      `${API}/stores?search=${search}&isActive=${isActive}&sortBy=${sortBy}&sortMoreBy=${sortMoreBy}&order=${order}&limit=${limit}&page=${page}`,
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

export const listStoresByUser = async (userId, token, filter) => {
  const { search, sortBy, order, limit, page } = filter
  try {
    const res = await fetch(
      `${API}/stores/by/user/${userId}?search=${search}&sortBy=${sortBy}&order=${order}&limit=${limit}&page=${page}`,
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

export const listStoresForAdmin = async (userId, token, filter) => {
  const { search, sortBy, sortMoreBy, order, isActive, limit, page } = filter
  try {
    const res = await fetch(
      `${API}/stores/for/admin/${userId}?search=${search}&sortBy=${sortBy}&sortMoreBy=${sortMoreBy}&isActive=${isActive}&order=${order}&limit=${limit}&page=${page}`,
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

export const createStore = async (userId, token, store) => {
  try {
    const res = await fetch(`${API}/store/create/${userId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: store
    })
    return await res.json()
  } catch (error) {
    return console.log(error)
  }
}

export const updateAvatar = async (userId, token, photo, storeId) => {
  try {
    const res = await fetch(`${API}/store/avatar/${storeId}/${userId}`, {
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

export const updateCover = async (userId, token, photo, storeId) => {
  try {
    const res = await fetch(`${API}/store/cover/${storeId}/${userId}`, {
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

export const addFeaturedImage = async (userId, token, photo, storeId) => {
  try {
    const res = await fetch(
      `${API}/store/featured/image/${storeId}/${userId}`,
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: photo
      }
    )
    return await res.json()
  } catch (error) {
    return console.log(error)
  }
}

export const updateFeaturedImage = async (
  userId,
  token,
  photo,
  index,
  storeId
) => {
  try {
    const res = await fetch(
      `${API}/store/featured/image/${storeId}/${userId}?index=${index}`,
      {
        method: 'PUT',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: photo
      }
    )
    return await res.json()
  } catch (error) {
    return console.log(error)
  }
}

export const removeFeaturedImage = async (userId, token, index, storeId) => {
  try {
    const res = await fetch(
      `${API}/store/featured/image/${storeId}/${userId}?index=${index}`,
      {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )
    return await res.json()
  } catch (error) {
    return console.log(error)
  }
}

export const addStaff = async (userId, token, staff, storeId) => {
  try {
    const res = await fetch(`${API}/store/staff/${storeId}/${userId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ staff })
    })
    return await res.json()
  } catch (error) {
    return console.log(error)
  }
}

export const deleteStaff = async (userId, token, staff, storeId) => {
  try {
    const res = await fetch(`${API}/store/staff/remove/${storeId}/${userId}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ staff })
    })
    return await res.json()
  } catch (error) {
    return console.log(error)
  }
}

export const cancelStaff = async (userId, token, storeId) => {
  try {
    const res = await fetch(`${API}/store/staff/cancel/${storeId}/${userId}`, {
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

export const openStore = async (userId, token, value, storeId) => {
  try {
    const res = await fetch(`${API}/store/open/${storeId}/${userId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(value)
    })
    return await res.json()
  } catch (error) {
    return console.log(error)
  }
}

export const activeStore = async (userId, token, value, storeId) => {
  try {
    const res = await fetch(`${API}/store/active/${storeId}/${userId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(value)
    })
    return await res.json()
  } catch (error) {
    return console.log(error)
  }
}

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
