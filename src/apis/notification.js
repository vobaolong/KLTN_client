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
