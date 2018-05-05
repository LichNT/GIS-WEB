import * as types from '../mutation-types'
import api from './../../api/index'
import auth from './../../auth'
import { REQUEST_STATUS } from './../../api/constants'

const { REQUESTING, SUCCESS, FAILURE } = REQUEST_STATUS

const state = {
  token: auth.getToken(),
  user: {
    id: -1,
    name: 'Guest'
  },

  loginRequest: {
    status: undefined,
    error: undefined
  },

  registerRequest: {
    status: undefined,
    error: undefined
  },

  logoutRequest: {
    status: undefined,
    error: undefined
  }
}

const getters = {
  token: state => state.token,
  loginRequest: state => state.loginRequest,
  logoutRequest: state => state.logoutRequest,
  registerRequest: state => state.registerRequest
}

const actions = {
  login ({ commit }, req) {
    commit(types.LOGIN_REQUEST)

    api.login(req)
      .then(res => {
        commit(types.LOGIN_SUCCESS, res.data)
        commit(types.STORE_TOKEN, res.data.token)
      })
      .catch(error => commit(types.LOGIN_FAILURE, error))
  },

  logout ({ commit }, req) {
    commit(types.LOGOUT_REQUEST)

    api.logout(req)
      .then(res => {
        commit(types.LOGOUT_SUCCESS)
        commit(types.CLEAR_TOKEN)
      })
      .catch(error => commit(types.LOGOUT_FAILURE, error))
  },

  register ({ commit }, req) {
    commit(types.REGISTER_REQUEST)

    api.register(req)
      .then(res => commit(types.REGISTER_SUCCESS, res.data))
      .catch(error => commit(types.REGISTER_FAILURE, error))
  }
}

const mutations = {
  [types.LOGIN_REQUEST]: (state) => {
    state.loginRequest.status = REQUESTING
    state.loginRequest.error = undefined
  },

  [types.LOGIN_SUCCESS]: (state, data) => {
    state.loginRequest.status = SUCCESS
    state.token = data.token
  },

  [types.LOGIN_FAILURE]: (state, error) => {
    state.loginRequest.status = FAILURE
    state.loginRequest.error = error
  },

  [types.LOGOUT_REQUEST]: (state) => {
    state.logoutRequest.status = REQUESTING
    state.logoutRequest.error = undefined
  },

  [types.LOGOUT_SUCCESS]: (state, data) => {
    state.logoutRequest.status = SUCCESS
  },

  [types.LOGOUT_FAILURE]: (state, error) => {
    state.logoutRequest.status = FAILURE
    state.logoutRequest.error = error
  },

  [types.REGISTER_REQUEST]: (state) => {
    state.registerRequest.status = REQUESTING
    state.registerRequest.error = undefined
  },

  [types.REGISTER_SUCCESS]: (state, data) => {
    state.registerRequest.status = SUCCESS
  },

  [types.REGISTER_FAILURE]: (state, error) => {
    state.registerRequest.status = FAILURE
    state.registerRequest.error = error
  },

  [types.STORE_TOKEN]: (state, token) => {
    state.token = token
    auth.setToken(token)
  },

  [types.CLEAR_TOKEN]: (state) => {
    state.token = undefined
    auth.removeToken()
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
