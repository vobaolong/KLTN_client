const API = process.env.REACT_APP_API_URL

export const getCategoryById = async (categoryId) => {
  try {
    const res = await fetch(`${API}/category/by/id/${categoryId}`, {
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

export const listActiveCategories = async (filter) => {
  const { search, sortBy, order, limit, page, categoryId } = filter
  try {
    const res = await fetch(
      `${API}/active/categories?search=${search}&categoryId=${categoryId}&sortBy=${sortBy}&order=${order}&limit=${limit}&page=${page}`,
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

export const listCategories = async (userId, token, filter) => {
  const { search, sortBy, order, limit, page, categoryId } = filter
  try {
    const res = await fetch(
      `${API}/categories/${userId}?search=${search}&categoryId=${categoryId}&sortBy=${sortBy}&order=${order}&limit=${limit}&page=${page}`,
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

export const createCategory = async (userId, token, category) => {
  try {
    const res = await fetch(`${API}/category/create/${userId}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: category
    })
    return await res.json()
  } catch (error) {
    return console.log(error)
  }
}

export const updateCategory = async (userId, token, categoryId, category) => {
  try {
    const res = await fetch(`${API}/category/${categoryId}/${userId}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: category
    })
    return await res.json()
  } catch (error) {
    return console.log(error)
  }
}

export const deleteCategory = async (userId, token, categoryId) => {
  try {
    const res = await fetch(`${API}/category/${categoryId}/${userId}`, {
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

export const restoreCategory = async (userId, token, categoryId) => {
  try {
    const res = await fetch(`${API}/category/restore/${categoryId}/${userId}`, {
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
