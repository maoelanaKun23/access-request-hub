interface InitialData {
  accessToken: string | null
  refreshToken: string
}

const INITIAL_DATA: InitialData = {
  accessToken: null,
  refreshToken: '',
}

export const getFromLocalStorage = (): string | null => {
  if (getUserUTHostname()) {
    return localStorage.getItem(import.meta.env.REACT_APP_CLIENT_ID_UT_PORTAL)
  }
  return localStorage.getItem(import.meta.env.REACT_APP_CLIENT_ID_UT_CONNECT)
}

// For getting data information from MSR Login
export const clientIdData = (): InitialData => {
  const clientId = getFromLocalStorage()

  if (clientId) {
    const parsedClientId = JSON.parse(clientId)
    return {
      ...INITIAL_DATA,
      accessToken: parsedClientId.tokenResponse.accessToken,
      refreshToken: parsedClientId.tokenResponse.refreshToken,
    }
  }
  return {...INITIAL_DATA}
}

export const updateLocalTokenResponse = (token: JSON) => {
  const data = JSON.parse(getFromLocalStorage() ?? '')
  data.tokenResponse = token

  if (getUserUTHostname()) {
    localStorage.setItem(
      import.meta.env.REACT_APP_CLIENT_ID_UT_PORTAL,
      JSON.stringify(data),
    )
  } else {
    localStorage.setItem(
      import.meta.env.REACT_APP_CLIENT_ID_UT_CONNECT,
      JSON.stringify(data),
    )
  }
}

// For getting data information from Portal Login
export const userData = (): {accessToken: string | null} => {
  const user = localStorage.getItem('userData')

  if (user) {
    return {
      accessToken: JSON.parse(user).tokenResponse.accessToken,
    }
  }
  return {
    accessToken: null,
  }
}

export const getUserUTHostname = (): boolean => {
  const patternUTPortal = /utportal/g
  const patternReverseProxy = /app/g
  const urlLocation = window.location.href

  const env = import.meta.env.MODE

  if (patternUTPortal.test(urlLocation)) {
    return true
  }
  if (patternReverseProxy.test(urlLocation)) {
    return true
  }

  // Uncomment this and comment the line below to use UTConnect localhost
  if (env === 'development') {
    return false
  }
  // if (env === 'development') {
  //   return true
  // }

  return false
}
