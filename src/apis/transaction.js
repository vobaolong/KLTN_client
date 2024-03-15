const API = process.env.REACT_APP_API_URL

export const listTransactionsByUser = async (userId, token, filter) => {
  const { sortBy, order, limit, page } = filter
  try {
    const res = await fetch(
      `${API}/transactions/by/user/${userId}?sortBy=${sortBy}&order=${order}&limit=${limit}&page=${page}`,
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

export const listTransactionsByStore = async (
  userId,
  token,
  filter,
  storeId
) => {
  const { sortBy, order, limit, page } = filter
  try {
    const res = await fetch(
      `${API}/transactions/by/store/${storeId}/${userId}?sortBy=${sortBy}&order=${order}&limit=${limit}&page=${page}`,
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

export const listTransactionsForAdmin = async (userId, token, filter) => {
  const { sortBy, order, limit, page } = filter
  try {
    const res = await fetch(
      `${API}/transactions/for/admin/${userId}?sortBy=${sortBy}&order=${order}&limit=${limit}&page=${page}`,
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

export const createTransactionByUser = async (userId, token, transaction) => {
  try {
    const res = await fetch(`${API}/transaction/create/by/user/${userId}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(transaction)
    })
    return await res.json()
  } catch (error) {
    return console.log(error)
  }
}

export const createTransactionByStore = async (
  userId,
  token,
  transaction,
  storeId
) => {
  try {
    const res = await fetch(
      `${API}/transaction/create/by/store/${storeId}/${userId}`,
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(transaction)
      }
    )
    return await res.json()
  } catch (error) {
    return console.log(error)
  }
}
