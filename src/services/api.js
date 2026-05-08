import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

// public api - no token
const publicApi = axios.create({ baseURL: BASE_URL })

// private api - with token
const privateApi = axios.create({ baseURL: BASE_URL })

privateApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// public
export const getProjects = () => publicApi.get('/api/projects')
export const getSkills = () => publicApi.get('/api/skills')
export const getEducation = () => publicApi.get('/api/education')
export const getExperiences = () => publicApi.get('/api/experiences')

// auth
export const loginUser = (email, password) => publicApi.post('/api/auth/login', { email, password })

// private - skills
export const createSkill = (data) => privateApi.post('/api/skills', data)
export const updateSkill = (id, data) => privateApi.put(`/api/skills/${id}`, data)
export const deleteSkill = (id) => privateApi.delete(`/api/skills/${id}`)

// private - projects
export const createProject = (data) => privateApi.post('/api/projects', data)
export const updateProject = (id, data) => privateApi.put(`/api/projects/${id}`, data)
export const deleteProject = (id) => privateApi.delete(`/api/projects/${id}`)

// private - experience
export const createExperience = (data) => privateApi.post('/api/experiences', data)
export const updateExperience = (id, data) => privateApi.put(`/api/experiences/${id}`, data)
export const deleteExperience = (id) => privateApi.delete(`/api/experiences/${id}`)

// private - education
export const createEducation = (data) => privateApi.post('/api/education', data)
export const updateEducation = (id, data) => privateApi.put(`/api/education/${id}`, data)
export const deleteEducation = (id) => privateApi.delete(`/api/education/${id}`)