const API = process.env.REACT_APP_API_URL

export const listActiveDeliveries = () => {
  return fetch(`${API}/active/deliveries`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then((res) => res.json())
    .catch((error) => console.log(error))
}

export const listDeliveries = (userId, token, filter) => {
  const { search, sortBy, order, limit, page } = filter
  return fetch(
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
    .then((res) => res.json())
    .catch((error) => console.log(error))
}

export const createDelivery = (userId, token, delivery) => {
  return fetch(`${API}/delivery/create/${userId}`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(delivery)
  })
    .then((res) => res.json())
    .catch((error) => console.log(error))
}

export const updateDelivery = (userId, token, deliveryId, delivery) => {
  return fetch(`${API}/delivery/${deliveryId}/${userId}`, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(delivery)
  })
    .then((res) => res.json())
    .catch((error) => console.log(error))
}

export const deleteDelivery = (userId, token, deliveryId) => {
  return fetch(`${API}/delivery/${deliveryId}/${userId}`, {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
    .then((res) => res.json())
    .catch((error) => console.log(error))
}

export const restoreDelivery = (userId, token, deliveryId) => {
  return fetch(`${API}/delivery/restore/${deliveryId}/${userId}`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
    .then((res) => res.json())
    .catch((error) => console.log(error))
}
