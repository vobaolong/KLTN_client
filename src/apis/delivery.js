const API = process.env.REACT_APP_API_URL

export const listActiveDeliveries = async () => {
  try {
    const res = await fetch(`${API}/active/deliveries`, {
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

export const listDeliveries = async (userId, token, filter) => {
  const { search, sortBy, order, limit, page } = filter
  try {
    const res = await fetch(
      `${API}/deliveries/${userId}?search=${search}&sortBy=${sortBy}&order=${order}&limit=${limit}&page=${page}`,
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

export const createDelivery = async (userId, token, delivery) => {
  try {
    const res = await fetch(`${API}/delivery/create/${userId}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(delivery)
    })
    return await res.json()
  } catch (error) {
    return console.log(error)
  }
}

export const updateDelivery = async (userId, token, deliveryId, delivery) => {
  try {
    const res = await fetch(`${API}/delivery/${deliveryId}/${userId}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(delivery)
    })
    return await res.json()
  } catch (error) {
    return console.log(error)
  }
}

export const deleteDelivery = async (userId, token, deliveryId) => {
  try {
    const res = await fetch(`${API}/delivery/${deliveryId}/${userId}`, {
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

export const restoreDelivery = async (userId, token, deliveryId) => {
  try {
    const res = await fetch(`${API}/delivery/restore/${deliveryId}/${userId}`, {
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
