
export default {
    getUser() {
        return JSON.parse(localStorage.getItem('data'))
    },
    setUser(data) {
        localStorage.setItem('data', JSON.stringify(data))
    },
    deleteUser() {
        localStorage.removeItem('data')
    },

    getToken() {
        return JSON.parse(sessionStorage.getItem('token'))
    },
    setToken(token) {
        sessionStorage.setItem('token', JSON.stringify(token))
    },
    deleteToken() {
        sessionStorage.removeItem('token')
    },
}

