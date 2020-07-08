import axios from 'axios'

export const API_URL = 'https://gestorabsencies-demo.somenergia.local'
export const APP = axios.create({ baseURL: API_URL })

export const absences = async (worker) => {
  return axios.get(`${API_URL}/absencies/workers/${worker}`)
    .then(response => {
      console.log(response)
      return response
    })
    .catch(error => error)
}
