export const getToken = key => {
  const data = window.localStorage.getItem(key)
  console.log(data)
  try {
    return JSON.parse(data)
  } catch (err) {
    return null
  }
}

export const getSetToken = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

export const remove = key => {
  window.localStorage.removeItem(key)
}