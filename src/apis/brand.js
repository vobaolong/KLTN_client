const API = process.env.REACT_APP_API_URL

export const getBrandById = async (userId, token, brandId) => {
  try {
    const res = await fetch(`${API}/brand/by/id/${brandId}/${userId}?`, {
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

export const listBrands = async (filter) => {
  const { search, sortBy, order, limit, page, categoryId } = filter
  try {
    const res = await fetch(
      `${API}/brands/?search=${search}&categoryId=${categoryId}&sortBy=${sortBy}&order=${order}&limit=${limit}&page=${page}`,
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

export const listBrandByCategory = async (categoryId) => {
  try {
    const res = await fetch(`${API}/active/brands?categoryId=${categoryId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json()
    console.log('API Response:', data)
    return data
  } catch (error) {
    console.log('API Error:', error)
    return null
  }
}

export const createBrand = async (userId, token, brand) => {
  try {
    const res = await fetch(`${API}/brand/create/${userId}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(brand)
    })
    return await res.json()
  } catch (error) {
    return console.log(error)
  }
}

export const updateBrand = async (userId, token, brandId, brand) => {
  try {
    const res = await fetch(`${API}/brand/${brandId}/${userId}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(brand)
    })
    return await res.json()
  } catch (error) {
    return console.log(error)
  }
}

export const deleteBrand = async (userId, token, brandId) => {
  try {
    const res = await fetch(`${API}/brand/${brandId}/${userId}`, {
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

export const restoreBrand = async (userId, token, brandId) => {
  try {
    const res = await fetch(`${API}/brand/restore/${brandId}/${userId}`, {
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
