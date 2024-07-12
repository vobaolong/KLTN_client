const API = process.env.REACT_APP_API_URL

export const getNotifications = async (userId) => {
  try {
    const res = await fetch(`${API}/notification/${userId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    })
    return await res.json()
  } catch (error) {
    return [
      {
        notifications: [],
        numberHidden: 0
      }
    ]
  }
}

export const updateRead = async (userId) => {
  try {
    const res = await fetch(`${API}/notification/${userId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json'
      }
    })
    return await res.json()
  } catch (error) {
    console.log(error)
  }
}

export const sendBanStoreEmail = async (userId, storeId) => {
  try {
    const res = await fetch(`${API}/send-ban-store/${userId}/${storeId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json'
      }
    })
    return await res.json()
  } catch (error) {
    console.log(error)
  }
}
export const sendCreateStoreEmail = async (userId, storeId) => {
  try {
    const res = await fetch(`${API}/send-create-store/${userId}/${storeId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json'
      }
    })
    return await res.json()
  } catch (error) {
    console.log(error)
  }
}
export const sendActiveStoreEmail = async (userId, storeId) => {
  try {
    const res = await fetch(`${API}/send-active-store/${userId}/${storeId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json'
      }
    })
    return await res.json()
  } catch (error) {
    console.log(error)
  }
}

export const sendActiveProductEmail = async (userId) => {
  try {
    const res = await fetch(`${API}/send-active-product/${userId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json'
      }
    })
    return await res.json()
  } catch (error) {
    console.log(error)
  }
}

export const sendBanProductEmail = async (userId) => {
  try {
    const res = await fetch(`${API}/send-ban-product/${userId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json'
      }
    })
    return await res.json()
  } catch (error) {
    console.log(error)
  }
}
export const deleteNotifications = async (userId) => {
  try {
    const res = await fetch(`${API}/notification/${userId}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json'
      }
    })
    return await res.json()
  } catch (error) {
    console.log(error)
  }
}
