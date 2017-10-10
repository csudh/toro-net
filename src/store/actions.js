import * as types from './mutation-types'
import axios from 'axios'

export const getUser = ({commit}) => {
  axios.get('/isauth')
  .then(function(response) {
    commit(types.GET_USER, response.data)
  })
  .catch(function (error) {
    console.log(error);
  })
}

export const getCount = ({commit}) => {
  fetch(`/count`, {
    method: 'GET'
  })
  .then(response => response.json())
  .then(json => commit(types.GET_COUNT, json))
}

export const incCount = ({commit}, countPayload) => {
  fetch(`/count`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ count: ++countPayload })
  })
  .then(response => response.json())
  .then(json => commit(types.INC_COUNT, json))
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
    .then(response => response.json())
    .then(json => commit(types.ADD_POST, json))
  }
}

export const getPosts = ({commit}) => {
  axios.get('/posts')
  .then(function (response) {
    commit(types.GET_POSTS, response.data)
  })
  .catch(function (error) {
    console.log(error);
  });
}