const API = process.env.REACT_APP_API_URL

export const listActiveCommissions = async () => {
  try {
    const res = await fetch(`${API}/active/commissions`, {
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

export const listCommissions = async (userId, token, filter) => {
  const { search, sortBy, order, limit, page } = filter
  try {
    const res = await fetch(
      `${API}/commissions/${userId}?search=${search}&sortBy=${sortBy}&order=${order}&limit=${limit}&page=${page}`,
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

export const getCommissionByStore = async (storeId) => {
  try {
    const res = await fetch(`${API}/store/commission/${storeId}`, {
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

export const createCommission = async (userId, token, commission) => {
  try {
    const res = await fetch(`${API}/commission/create/${userId}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(commission)
    })
    return await res.json()
  } catch (error) {
    return console.log(error)
  }
}

export const updateCommission = async (
  userId,
  token,
  commissionId,
  commission
) => {
  try {
    const res = await fetch(`${API}/commission/${commissionId}/${userId}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(commission)
    })
    return await res.json()
  } catch (error) {
    return console.log(error)
  }
}

export const deleteCommission = async (userId, token, commissionId) => {
  try {
    const res = await fetch(`${API}/commission/${commissionId}/${userId}`, {
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

export const restoreCommission = async (userId, token, commissionId) => {
  try {
    const res = await fetch(
      `${API}/commission/restore/${commissionId}/${userId}`,
      {
        method: 'GET',
        mode: 'cors',
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
