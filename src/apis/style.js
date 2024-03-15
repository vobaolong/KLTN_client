const API = process.env.REACT_APP_API_URL

export const getStyleById = async (userId, token, styleId) => {
  try {
    const res = await fetch(`${API}/style/by/id/${styleId}/${userId}?`, {
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

export const listStyles = async (userId, token, filter) => {
  const { search, sortBy, order, limit, page, categoryId } = filter
  try {
    const res = await fetch(
      `${API}/styles/${userId}?search=${search}&categoryId=${categoryId}&sortBy=${sortBy}&order=${order}&limit=${limit}&page=${page}`,
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

export const listStyleByCategory = async (categoryId) => {
  try {
    const res = await fetch(
      `${API}/active/styles?categoryId=${categoryId}&limit=100`,
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

export const createStyle = async (userId, token, style) => {
  try {
    const res = await fetch(`${API}/style/create/${userId}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(style)
    })
    return await res.json()
  } catch (error) {
    return console.log(error)
  }
}

export const updateStyle = async (userId, token, styleId, style) => {
  try {
    const res = await fetch(`${API}/style/${styleId}/${userId}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(style)
    })
    return await res.json()
  } catch (error) {
    return console.log(error)
  }
}

export const deleteStyle = async (userId, token, styleId) => {
  try {
    const res = await fetch(`${API}/style/${styleId}/${userId}`, {
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

export const restoreStyle = async (userId, token, styleId) => {
  try {
    const res = await fetch(`${API}/style/restore/${styleId}/${userId}`, {
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

//style value
export const listActiveStyleValues = async (styleId) => {
  try {
    const res = await fetch(`${API}/active/style/values/by/style/${styleId}`, {
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

export const listStyleValues = async (userId, token, styleId) => {
  try {
    const res = await fetch(
      `${API}/style/values/by/style/${styleId}/${userId}`,
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

export const createStyleValue = async (userId, token, styleValue) => {
  try {
    const res = await fetch(`${API}/style/value/create/${userId}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(styleValue)
    })
    return await res.json()
  } catch (error) {
    return console.log(error)
  }
}

export const updateStyleValue = async (userId, token, valueId, styleValue) => {
  try {
    const res = await fetch(`${API}/style/value/${valueId}/${userId}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(styleValue)
    })
    return await res.json()
  } catch (error) {
    return console.log(error)
  }
}

export const deleteStyleValue = async (userId, token, styleValueId) => {
  try {
    const res = await fetch(`${API}/style/value/${styleValueId}/${userId}`, {
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

export const restoreStyleValue = async (userId, token, styleValueId) => {
  try {
    const res = await fetch(
      `${API}/style/value/restore/${styleValueId}/${userId}`,
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
