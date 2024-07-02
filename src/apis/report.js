const API = process.env.REACT_APP_API_URL

export const listReportsForAdmin = async (filter) => {
  const { sortBy, order, limit, page, isStore } = filter
  try {
    const res = await fetch(
      `${API}/reports/?sortBy=${sortBy}&isStore=${isStore}&order=${order}&limit=${limit}&page=${page}`,
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
export const reportByUser = async (data) => {
  try {
    const res = await fetch(`${API}/reports`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (!res.ok) {
      throw new Error('Network response was not ok')
    }

    return await res.json()
  } catch (error) {
    console.error(error)
    throw error
  }
}
