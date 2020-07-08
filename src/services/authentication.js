import axios from 'axios'

export const API_URL = 'https://gestorabsencies-demo.somenergia.local'
export const APP = axios.create({ baseURL: API_URL })

export const loginService = async (username, password) => {
  return axios.post(`${API_URL}/login/`, {
    username,
    password
  })
    .then(response => {
      return response
    })
    .catch(error => error)
}
