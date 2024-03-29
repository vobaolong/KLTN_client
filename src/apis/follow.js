const API = process.env.REACT_APP_API_URL

//user follow store
export const listFollowingStores = async (userId, token, filter) => {
  const { search, sortBy, order, limit, page } = filter
  try {
    const res = await fetch(
      `${API}/following/stores/${userId}?&limit=${limit}&page=${page}`,
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

export const getNumberOfFollowers = async (storeId) => {
  try {
    const res = await fetch(`${API}/store/number/of/followers/${storeId}`, {
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

export const checkFollowingStore = async (userId, token, storeId) => {
  try {
    const res = await fetch(
      `${API}/check/following/stores/${storeId}/${userId}`,
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

export const followStore = async (userId, token, storeId) => {
  try {
    const res = await fetch(`${API}/follow/store/${storeId}/${userId}`, {
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

export const unfollowStore = async (userId, token, storeId) => {
  try {
    const res = await fetch(`${API}/unfollow/store/${storeId}/${userId}`, {
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

//user follow product
export const followProduct = async (userId, token, productId) => {
  try {
    const res = await fetch(`${API}/follow/product/${productId}/${userId}`, {
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

export const unfollowProduct = async (userId, token, productId) => {
  try {
    const res = await fetch(`${API}/unfollow/product/${productId}/${userId}`, {
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

export const getNumberOfFollowersForProduct = async (productId) => {
  try {
    const res = await fetch(`${API}/product/number/of/followers/${productId}`, {
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

export const checkFollowingProduct = async (userId, token, productId) => {
  try {
    const res = await fetch(
      `${API}/check/following/products/${productId}/${userId}`,
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

export const listFollowingProducts = async (userId, token, filter) => {
  const { search, sortBy, order, limit, page } = filter
  try {
    const res = await fetch(
      `${API}/following/products/${userId}?&limit=${limit}&page=${page}`,
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
