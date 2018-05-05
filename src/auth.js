import { TOKEN_STORAGE_KEY } from './config'

export default {
  setToken (token) {
    window.localStorage.setItem(TOKEN_STORAGE_KEY, token)
  },

  getToken () {
    return window.localStorage.getItem(TOKEN_STORAGE_KEY)
  },

  removeToken () {
    window.localStorage.removeItem(TOKEN_STORAGE_KEY)
  },

  loggedIn () {
    return !!this.getToken()
  }
}
