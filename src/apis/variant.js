const API = process.env.REACT_APP_API_URL

export const getVariantById = async (userId, token, variantId) => {
  try {
    const res = await fetch(`${API}/variant/by/id/${variantId}/${userId}?`, {
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

export const listVariants = async (userId, token, filter) => {
  const { search, sortBy, order, limit, page, categoryId } = filter
  try {
    const res = await fetch(
      `${API}/variants/${userId}?search=${search}&categoryId=${categoryId}&sortBy=${sortBy}&order=${order}&limit=${limit}&page=${page}`,
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

export const listVariantByCategory = async (categoryId) => {
  try {
    const res = await fetch(
      `${API}/active/variants?categoryId=${categoryId}&limit=100`,
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

export const createVariant = async (userId, token, variant) => {
  try {
    const res = await fetch(`${API}/variant/create/${userId}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(variant)
    })
    return await res.json()
  } catch (error) {
    return console.log(error)
  }
}

export const updateVariant = async (userId, token, variantId, variant) => {
  try {
    const res = await fetch(`${API}/variant/${variantId}/${userId}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(variant)
    })
    return await res.json()
  } catch (error) {
    return console.log(error)
  }
}

export const deleteVariant = async (userId, token, variantId) => {
  try {
    const res = await fetch(`${API}/variant/${variantId}/${userId}`, {
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

export const restoreVariant = async (userId, token, variantId) => {
  try {
    const res = await fetch(`${API}/variant/restore/${variantId}/${userId}`, {
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

//variant value
export const listActiveVariantValues = async (variantId) => {
  try {
    const res = await fetch(
      `${API}/active/variant/values/by/variant/${variantId}`,
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

export const listVariantValues = async (userId, token, variantId) => {
  try {
    const res = await fetch(
      `${API}/variant/values/by/variant/${variantId}/${userId}`,
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

export const createVariantValue = async (userId, token, variantValue) => {
  try {
    const res = await fetch(`${API}/variant/value/create/${userId}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(variantValue)
    })
    return await res.json()
  } catch (error) {
    return console.log(error)
  }
}

export const updateVariantValue = async (
  userId,
  token,
  valueId,
  variantValue
) => {
  try {
    const res = await fetch(`${API}/variant/value/${valueId}/${userId}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(variantValue)
    })
    return await res.json()
  } catch (error) {
    return console.log(error)
  }
}

export const deleteVariantValue = async (userId, token, variantValueId) => {
  try {
    const res = await fetch(
      `${API}/variant/value/${variantValueId}/${userId}`,
      {
        method: 'DELETE',
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

export const restoreVariantValue = async (userId, token, variantValueId) => {
  try {
    const res = await fetch(
      `${API}/variant/value/restore/${variantValueId}/${userId}`,
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
