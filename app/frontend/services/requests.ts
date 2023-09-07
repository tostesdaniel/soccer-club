import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://soccer-club-api.onrender.com',
})

interface LoginData {
  email: string
  password: string
}

export const setToken = (token: string) =>
  (instance.defaults.headers.common.Authorization = token)

export const login = (data: LoginData) => instance.post('/login', data)

export const getLeaderboard = (path: string) =>
  instance.get(`/leaderboard${path}`)

export const getMatches = (inProgress: string = '/') =>
  instance.get(`/matches${inProgress}`)

export default instance
