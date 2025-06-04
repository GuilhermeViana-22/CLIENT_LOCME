import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  
  // State
  const token = ref(localStorage.getItem('token') || null)
  const isLoading = ref(false)
  const error = ref(null)
  const user = ref(JSON.parse(localStorage.getItem('user')) || null)

  // Getters
  const isAuthenticated = computed(() => !!token.value)
  const currentUser = computed(() => user.value)

  // Actions
  const setToken = (newToken) => {
    token.value = newToken
    localStorage.setItem('token', newToken)
    api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
  }

  const setUser = (userData) => {
    user.value = userData
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const login = async (credentials) => {
    try {
      isLoading.value = true
      error.value = null
      
      const response = await api.post('/login', credentials)
      
      setToken(response.data.token)
      if (response.data.user) {
        setUser(response.data.user)
      }
      
      return response.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Login failed'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const logout = () => {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    delete api.defaults.headers.common['Authorization']
    router.push({ name: 'login' })
  }

  const validateToken = async () => {
    try {
      if (!token.value) return false
      
      const response = await api.get('/auth/validate')
      if (response.data.user) {
        setUser(response.data.user)
      }
      return true
    } catch (err) {
      logout()
      return false
    }
  }

  // Initialize auth state
  if (token.value) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
    validateToken()
  }

  return {
    token,
    user,
    isLoading,
    error,
    isAuthenticated,
    currentUser,
    setToken,
    setUser,
    login,
    logout,
    validateToken
  }
})