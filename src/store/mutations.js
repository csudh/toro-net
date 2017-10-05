import * as types from './mutation-types'

export const mutations = {
  [types.GET_USER] (state, user) {
    state.user = user
  },
  [types.LOGIN] (state, user) {
    state.user = user 
  },
  [types.LOGOUT] (state) {
    state.user = {}
  },
  [types.GET_COUNT] (state, countPayload) {
    state.counts = countPayload
  },
  [types.INC_COUNT] (state, countPayload) {
    state.counts.count = countPayload
  },
  [types.REGISTER] (state, userPayload) {
    state.user = userPayload
  },
  [types.ADD_POST] (state, postsPayload) {
    state.posts = postsPayload
  }
}
