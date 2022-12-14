export const storeAuth = (auth) => {
    localStorage.setItem('auth', JSON.stringify(auth))
}

export const getAuth = () => {
    return JSON.parse(localStorage.getItem('auth'))
}

export const unsetAuth = () => {
    localStorage.removeItem('auth')
}