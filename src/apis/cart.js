const API = process.env.REACT_APP_API_URL

export const getCartCount = async (userId, token) => {
  try {
    const res = await fetch(`${API}/cart/count/${userId}`, {
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

export const addToCart = async (userId, token, cartItem) => {
  try {
    const res = await fetch(`${API}/cart/add/${userId}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(cartItem)
    })
    return await res.json()
  } catch (error) {
    return console.log(error)
  }
}

export const listCarts = async (userId, token, filter) => {
  const { limit, page } = filter
  try {
    const res = await fetch(
      `${API}/carts/${userId}?limit=${limit}&page=${page}`,
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

export const listItemsByCart = async (userId, token, cartId) => {
  try {
    const res = await fetch(`${API}/cart/items/${cartId}/${userId}`, {
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

export const deleteFromCart = async (userId, token, cartItemId) => {
  try {
    const res = await fetch(`${API}/cart/remove/${cartItemId}/${userId}`, {
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

export const updateCartItem = async (userId, token, count, cartItemId) => {
  try {
    const res = await fetch(`${API}/cart/update/${cartItemId}/${userId}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(count)
    })
    return await res.json()
  } catch (error) {
    return console.log(error)
  }
}
