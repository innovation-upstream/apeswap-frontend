import axios from 'axios'

const baseUrl = {
  local: 'http://localhost:3333/stats',
  prod: 'https://jellyfish-app-vtrfw.ondigitalocean.app/stats',
}

export const statsApi = axios.create({
  baseURL: baseUrl.prod,
})
