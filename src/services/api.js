import axios from 'axios'
import { useAuthStore } from '@/stores/auth/auth.store'
import router from '@/router'

// Configuração base do axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  withCredentials: true // Para cookies de sessão
})

/**
 * Interceptador de requisições
 */
api.interceptors.request.use(
    (config) => {
      const authStore = useAuthStore()

      // Log para debug (apenas em desenvolvimento)
      if (import.meta.env.DEV) {
        console.debug(`[API] ${config.method?.toUpperCase()} ${config.url}`)
        if (config.data) {
          console.debug('[API] Request Data:', config.data)
        }
      }

      // Adiciona token de autenticação se existir
      if (authStore.token && !config.headers['Authorization']) {
        config.headers.Authorization = `Bearer ${authStore.token}`
      }

      // Adiciona headers específicos para uploads
      if (config.data instanceof FormData) {
        config.headers['Content-Type'] = 'multipart/form-data'
      }

      return config
    },
    (error) => {
      console.error('[API] Request Error:', error)
      return Promise.reject(error)
    }
)

/**
 * Interceptador de respostas
 */
api.interceptors.response.use(
    (response) => {
      // Log para debug
      if (import.meta.env.DEV) {
        console.debug(
            `[API] ${response.status} ${response.config.method?.toUpperCase()} ${response.config.url}`,
            response.data
        )
      }

      // Atualiza token e usuário se a resposta trouxer
      if (response.data?.token || response.data?.user) {
        const authStore = useAuthStore()

        if (response.data.token) {
          authStore.setToken(response.data.token)
        }

        if (response.data.user) {
          authStore.setUser(response.data.user)
        }
      }

      return response.data
    },
    async (error) => {
      // Erros sem resposta (network errors)
      if (!error.response) {
        console.error('[API] Network Error:', error)
        return Promise.reject({
          status: 0,
          message: 'Erro de conexão. Verifique sua internet.',
          isNetworkError: true
        })
      }

      const { status, data, config } = error.response
      const authStore = useAuthStore()

      console.error(
          `[API] ${status} ${config.method?.toUpperCase()} ${config.url}`,
          data
      )

      // Tratamento específico para erros 401 Unauthorized
      if (status === 401 && authStore.isAuthenticated) {
        try {
          // Tenta renovar o token
          const newToken = await authStore.refreshToken()

          // Repete a requisição original com o novo token
          config.headers.Authorization = `Bearer ${newToken}`
          return api(config)
        } catch (refreshError) {
          console.error('[API] Refresh token failed:', refreshError)
          authStore.logout()

          // Redireciona para login se não estiver já na página de login
          if (router.currentRoute.value.name !== 'login') {
            router.push({
              name: 'login',
              query: {
                redirect: router.currentRoute.value.fullPath,
                sessionExpired: true
              }
            })
          }

          return Promise.reject({
            status: 401,
            message: 'Sessão expirada. Por favor, faça login novamente.',
            isSessionExpired: true
          })
        }
      }

      // Padronização de erros
      return Promise.reject({
        status,
        message: data.message || 'Erro desconhecido',
        errors: data.errors,
        code: data.code,
        originalError: error
      })
    }
)

export default api