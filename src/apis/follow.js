const API = process.env.REACT_APP_API_URL

//user follow store
export const listFollowingStores = (userId, token, filter) => {
  const { search, sortBy, order, limit, page } = filter
  return fetch(
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
    .then((res) => res.json())
    .catch((error) => console.log(error))
}

export const getNumberOfFollowers = (storeId) => {
  return fetch(`${API}/store/number/of/followers/${storeId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then((res) => res.json())
    .catch((error) => console.log(error))
}

export const checkFollowingStore = (userId, token, storeId) => {
  return fetch(`${API}/check/following/stores/${storeId}/${userId}`, {
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

export const followStore = (userId, token, storeId) => {
  return fetch(`${API}/follow/store/${storeId}/${userId}`, {
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

export const unfollowStore = (userId, token, storeId) => {
  return fetch(`${API}/unfollow/store/${storeId}/${userId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
    .then((res) => res.json())
    .catch((error) => console.log(error))
}

//user follow product
export const followProduct = (userId, token, productId) => {
  return fetch(`${API}/follow/product/${productId}/${userId}`, {
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

export const unfollowProduct = (userId, token, productId) => {
  return fetch(`${API}/unfollow/product/${productId}/${userId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
    .then((res) => res.json())
    .catch((error) => console.log(error))
}

export const getNumberOfFollowersForProduct = (productId) => {
  return fetch(`${API}/product/number/of/followers/${productId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then((res) => res.json())
    .catch((error) => console.log(error))
}

export const checkFollowingProduct = (userId, token, productId) => {
  return fetch(`${API}/check/following/products/${productId}/${userId}`, {
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

export const listFollowingProducts = (userId, token, filter) => {
  const { search, sortBy, order, limit, page } = filter
  return fetch(
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
    .then((res) => res.json())
    .catch((error) => console.log(error))
}
