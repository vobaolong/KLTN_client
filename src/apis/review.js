const API = process.env.REACT_APP_API_URL

export const listReviews = async (filter) => {
  const { productId, storeId, userId, rating, sortBy, order, limit, page } =
    filter

  try {
    const res = await fetch(
      `${API}/reviews?productId=${productId}&storeId=${storeId}&userId=${userId}&rating=${rating}&sortBy=${sortBy}&order=${order}&limit=${limit}&page=${page}`,
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

export const checkReview = async (userId, token, data) => {
  try {
    const res = await fetch(`${API}/review/check/${userId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
    return await res.json()
  } catch (error) {
    return console.log(error)
  }
}

export const reviewProduct = async (userId, token, review) => {
  try {
    const res = await fetch(`${API}/review/create/${userId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(review)
    })
    return await res.json()
  } catch (error) {
    return console.log(error)
  }
}

export const editReview = async (userId, token, review, reviewId) => {
  try {
    const res = await fetch(`${API}/review/${reviewId}/${userId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(review)
    })
    return await res.json()
  } catch (error) {
    return console.log(error)
  }
}

export const removeReview = async (userId, token, reviewId) => {
  try {
    const res = await fetch(`${API}/review/${reviewId}/${userId}`, {
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

export const deleteReviews = async (userId, token, reviewId) => {
  try {
    const res = await fetch(`${API}/reviews/${reviewId}/${userId}`, {
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
