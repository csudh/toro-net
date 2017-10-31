import * as types from './mutation-types'
import axios from 'axios'

export const getUser = ({commit}) => {
  axios.get('/isauth')
  .then(function(res) {
    commit(types.GET_USER, res.data)
  })
  .catch(function(err) {
    console.log(err);
  })
}

export const getCount = ({commit}) => {
  axios.get('/count')
  .then(function(res) {
    commit(types.GET_COUNT, { count: res.data.count })
  })
  .catch(function(err) {
    console.log(err)
  })
}

export const incCount = ({commit}, countPayload) => {
  axios.post('/count', {
    count: ++countPayload
  })
  .then(function(res) {
    commit(types.INC_COUNT, { count: res.data.count })
  })
  .catch(function(err) {
    console.log(err)
  })
}

export const registerUser = ({commit}, userPayload) => {
  return new Promise((resolve, reject) => {
    fetch(`/users/register`, {
      method: 'POST',
      redirect: 'follow',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userPayload)
    })
    .then(res => {
      resolve(res)
    })
    .then(err => {
      reject(err)
    })
  })
}

export const logout = ({commit}) => {
  commit(types.LOGOUT)
}

export const addPost = ({commit}, postsPayload) => {
  fetch(`/posts`), {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: title,
      body: body 
    })
    .then(res => res.json())
    .then(json => commit(types.ADD_POST, json))
  }
}

export const getPosts = ({commit}) => {
  axios.get('/posts')
  .then(function(res) {
    commit(types.GET_POSTS, res.data)
  })
  .catch(function(err) {
    console.log(err);
  });
}