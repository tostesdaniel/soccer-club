import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://soccer-club-production.up.railway.app/',
})

interface LoginData {
  email: string
  password: string
}

export const setToken = (token: string) =>
  (instance.defaults.headers.common.Authorization = token)

export const login = (data: LoginData) => instance.post('/login', data)

export const getLeaderboard = (path: string) => instance.get(`/leaderboard${path}`)

export default instance
