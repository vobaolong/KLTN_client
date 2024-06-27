const API = process.env.REACT_APP_API_URL

export const listReportsForAdmin = async (userId, token, filter) => {
  const { sortBy, order, limit, page, isStore } = filter
  try {
    const res = await fetch(
      `${API}/report/${userId}?sortBy=${sortBy}&isStore=${isStore}&order=${order}&limit=${limit}&page=${page}`,
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
