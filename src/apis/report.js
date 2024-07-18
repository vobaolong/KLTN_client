const API = process.env.REACT_APP_API_URL

export const listReportsForAdmin = async (filter) => {
  const { search, sortBy, order, limit, page, isStore, isProduct, isReview } =
    filter
  try {
    const res = await fetch(
      `${API}/reports?search=${search}&sortBy=${sortBy}&isStore=${isStore}&isProduct=${isProduct}&isReview=${isReview}&order=${order}&limit=${limit}&page=${page}`,
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

export const deleteReport = async (reportId) => {
  try {
    const res = await fetch(`${API}/reports/${reportId}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
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
