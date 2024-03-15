const API = process.env.REACT_APP_API_URL

export const getOrderByUser = async (userId, token, orderId) => {
  try {
    const res = await fetch(`${API}/order/by/user/${orderId}/${userId}`, {
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

export const getOrderByStore = async (userId, token, orderId, storeId) => {
  try {
    const res = await fetch(
      `${API}/order/by/store/${orderId}/${storeId}/${userId}`,
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

export const getOrderForAdmin = async (userId, token, orderId) => {
  try {
    const res = await fetch(`${API}/order/for/admin/${orderId}/${userId}`, {
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

export const createOrder = async (userId, token, cartId, order) => {
  try {
    const res = await fetch(`${API}/order/create/${cartId}/${userId}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(order)
    })
    return await res.json()
  } catch (error) {
    return console.log(error)
  }
}

export const listItemsByOrder = async (userId, token, orderId) => {
  try {
    const res = await fetch(`${API}/order/items/by/user/${orderId}/${userId}`, {
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

export const listItemsByOrderByStore = async (
  userId,
  token,
  orderId,
  storeId
) => {
  try {
    const res = await fetch(
      `${API}/order/items/by/store/${orderId}/${storeId}/${userId}`,
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

export const listItemsByOrderForAdmin = async (userId, token, orderId) => {
  try {
    const res = await fetch(
      `${API}/order/items/for/admin/${orderId}/${userId}`,
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

export const listOrdersByUser = async (userId, token, filter) => {
  const { search, sortBy, order, limit, page, status } = filter
  try {
    const res = await fetch(
      `${API}/orders/by/user/${userId}?search=${search}&status=${status}&sortBy=${sortBy}&order=${order}&limit=${limit}&page=${page}`,
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

export const listOrdersByStore = async (userId, token, filter, storeId) => {
  const { search, sortBy, order, limit, page, status } = filter
  try {
    const res = await fetch(
      `${API}/orders/by/store/${storeId}/${userId}?search=${search}&status=${status}&sortBy=${sortBy}&order=${order}&limit=${limit}&page=${page}`,
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

export const listOrdersForAdmin = async (userId, token, filter) => {
  const { search, sortBy, order, limit, page, status } = filter
  try {
    const res = await fetch(
      `${API}/orders/for/admin/${userId}?search=${search}&status=${status}&sortBy=${sortBy}&order=${order}&limit=${limit}&page=${page}`,
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

export const userCancelOrder = async (userId, token, status, orderId) => {
  try {
    const res = await fetch(
      `${API}/order/update/by/user/${orderId}/${userId}`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(status)
      }
    )
    return await res.json()
  } catch (error) {
    return console.log(error)
  }
}

export const vendorUpdateStatusOrder = async (
  userId,
  token,
  status,
  orderId,
  storeId
) => {
  try {
    const res = await fetch(
      `${API}/order/update/by/store/${orderId}/${storeId}/${userId}`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(status)
      }
    )
    return await res.json()
  } catch (error) {
    return console.log(error)
  }
}

export const adminUpdateStatusOrder = async (
  userId,
  token,
  status,
  orderId
) => {
  try {
    const res = await fetch(
      `${API}/order/update/for/admin/${orderId}/${userId}`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(status)
      }
    )
    return await res.json()
  } catch (error) {
    return console.log(error)
  }
}

export const countOrder = async (status, userId, storeId) => {
  try {
    const res = await fetch(
      `${API}/orders/count?status=${status}&userId=${userId}&storeId=${storeId}`,
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
