const API = process.env.REACT_APP_API_URL;

export const getAddressCache = async (address) => {
  try {
    const res = await fetch(`${API}/cacheAddress/${address}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  } catch (error) {
    return null;
  }
};

export const getProvinces = async () => {
  try {
    const res = await fetch(`${API}/getProvinces`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  } catch (error) {
    return [];
  }
};
