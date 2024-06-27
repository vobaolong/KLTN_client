import axios from 'axios'
import qs from 'qs'
const API = process.env.REACT_APP_API_URL

export const getProduct = async (productId) => {
  try {
    const res = await fetch(`${API}/product/${productId}`, {
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

export const getProductByIdForManager = async (
  userId,
  token,
  productId,
  storeId
) => {
  try {
    const res = await fetch(
      `${API}/product/for/manager/${productId}/${storeId}/${userId}`,
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

//list product
export const listActiveProducts = async (filter) => {
  const {
    search,
    sortBy,
    order,
    limit,
    page,
    rating,
    minPrice,
    maxPrice,
    categoryId,
    provinces
  } = filter
  try {
    const res = await axios.get(
      `${API}/active/products?search=${search}&rating=${rating}&minPrice=${minPrice}&maxPrice=${maxPrice}&categoryId=${categoryId}&sortBy=${sortBy}&order=${order}&limit=${limit}&page=${page}`,
      {
        params: {
          provinces: provinces
        },
        paramsSerializer: (params) => {
          return qs.stringify(params, { encode: false })
        }
      }
    )
    return res.data
  } catch (error) {
    return console.log(error)
  }
}

export const listSellingProductsByStore = async (filter, storeId) => {
  const {
    search,
    sortBy,
    order,
    limit,
    page,
    rating,
    minPrice,
    maxPrice,
    categoryId
  } = filter
  try {
    const res = await fetch(
      `${API}/selling/products/by/store/${storeId}?search=${search}&rating=${rating}&minPrice=${minPrice}&maxPrice=${maxPrice}&categoryId=${categoryId}&sortBy=${sortBy}&order=${order}&limit=${limit}&page=${page}`,
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

export const listProductsForManager = async (
  userId,
  token,
  filter,
  storeId
) => {
  const { search, sortBy, order, limit, page, isSelling, quantity, isActive } =
    filter
  try {
    const res = await fetch(
      `${API}/products/by/store/${storeId}/${userId}?search=${search}&isSelling=${isSelling}&isActive=${isActive}&quantity=${quantity}&sortBy=${sortBy}&order=${order}&limit=${limit}&page=${page}`,
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

export const listProductsForAdmin = async (userId, token, filter) => {
  const { search, sortBy, order, limit, page, isActive } = filter
  try {
    const res = await fetch(
      `${API}/products/${userId}?search=${search}&isActive=${isActive}&sortBy=${sortBy}&order=${order}&limit=${limit}&page=${page}`,
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

//sell-store product
export const sellingProduct = async (
  userId,
  token,
  value,
  storeId,
  productId
) => {
  try {
    const res = await fetch(
      `${API}/product/selling/${productId}/${storeId}/${userId}`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(value)
      }
    )
    return await res.json()
  } catch (error) {
    return console.log(error)
  }
}

//activeProduct
export const activeProduct = async (userId, token, value, productId) => {
  try {
    const res = await fetch(`${API}/product/active/${productId}/${userId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(value)
    })
    return await res.json()
  } catch (error) {
    return console.log(error)
  }
}

//crud
export const createProduct = async (userId, token, product, storeId) => {
  try {
    const res = await fetch(`${API}/product/create/${storeId}/${userId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: product
    })
    return await res.json()
  } catch (error) {
    return console.log(error)
  }
}

export const updateProduct = async (
  userId,
  token,
  product,
  productId,
  storeId
) => {
  try {
    const res = await fetch(
      `${API}/product/update/${productId}/${storeId}/${userId}`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: product
      }
    )
    return await res.json()
  } catch (error) {
    return console.log(error)
  }
}

//list listImages
export const addListImages = async (
  userId,
  token,
  photo,
  productId,
  storeId
) => {
  try {
    const res = await fetch(
      `${API}/product/images/${productId}/${storeId}/${userId}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: photo
      }
    )
    return await res.json()
  } catch (error) {
    return console.log(error)
  }
}

export const updateListImages = async (
  userId,
  token,
  photo,
  index,
  productId,
  storeId
) => {
  try {
    const res = await fetch(
      `${API}/product/images/${productId}/${storeId}/${userId}?index=${index}`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: photo
      }
    )
    return await res.json()
  } catch (error) {
    return console.log(error)
  }
}

export const removeListImages = async (
  userId,
  token,
  index,
  productId,
  storeId
) => {
  try {
    const res = await fetch(
      `${API}/product/images/${productId}/${storeId}/${userId}?index=${index}`,
      {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )
    return await res.json()
  } catch (error) {
    return console.log(error)
  }
}
