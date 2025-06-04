import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'
import { useToast } from '@/composables/useToast'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  const { success, error: showError } = useToast()
  
  // Estado da aplicação
  const user = ref(null)
  const token = ref(localStorage.getItem('auth_token') || null)
  const errors = ref({})
  const isLoading = ref(false)

  // Computed - verifica se usuário está autenticado
  const isAuthenticated = computed(() => !!token.value)

  // Setters
  const setToken = (newToken) => {
    // Remove a palavra 'Bearer' se existir
    const cleanToken = newToken ? newToken.replace(/^Bearer\s+/i, '') : null
    token.value = cleanToken
    
    if (cleanToken) {
      // Salva no localStorage e configura no cabeçalho da API
      localStorage.setItem('auth_token', cleanToken)
      api.defaults.headers.common['Authorization'] = `Bearer ${cleanToken}`
    } else {
      // Remove do localStorage e da API
      localStorage.removeItem('auth_token')
      delete api.defaults.headers.common['Authorization']
    }
  }

  const setUser = (userData) => {
    user.value = userData ? {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      telefone_celular: userData.telefone_celular,
      created_at: userData.created_at,
      updated_at: userData.updated_at
    } : null
  }

  // Métodos principais
  const register = async (formData) => {
    isLoading.value = true
    errors.value = {} // Limpa erros anteriores

    try {
      // Faz a requisição para a API
      const response = await api.post('/register', {
        name: formData.name.trim(),
        email: formData.email.trim(),
        telefone_celular: formData.telefone_celular.replace(/\D/g, ''), // Remove formatação do telefone
        password: formData.password,
        password_confirmation: formData.password_confirmation
      }, {
        timeout: 20000 // 15 segundos de timeout
      })
     

      if (response.user) {
        setUser(response.user)
        setToken(response.user.access_token)
     

        await router.push({ name: 'dashboard' })
        return response.data.user
      }
      
      throw new Error('Resposta inesperada do servidor')
    } catch (err) {
      handleErrors(err) // Trata os erros
      throw err // Reenvia o erro para ser tratado no componente
    } finally {
      isLoading.value = false
    }
  }

// No método login
// Adicione este método no store
  // Funções para manipular email lembrado
// Métodos para Remember Email
  const setRememberedEmail = (email) => {
    if (email) {
      localStorage.setItem('remembered_email', email)
    } else {
      localStorage.removeItem('remembered_email')
    }
  }

  const getRememberedEmail = () => {
    return localStorage.getItem('remembered_email') || null
  }
  // Função de login
  const login = async (formData) => {
    isLoading.value = true
    errors.value = {}

    try {
      const response = await api.post('/login', {
        email: formData.email.trim(),
        password: formData.password
      })
      
      user.value = response.data.user.user
      token.value = response.data.user.access_token
      
      // Redireciona após login bem-sucedido
      await router.push({ name: 'dashboard' })
      return response.data.user
    } catch (err) {
      errors.value = err.response?.data?.errors || {}
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    success('Você foi desconectado')
    router.push({ name: 'login' })
  }

  const refreshToken = async () => {
    try {
      const response = await api.post('/refresh-token')
      setToken(response.user.access_token)
      return response.user.access_token
    } catch (err) {
      showError('Sessão expirada, faça login novamente')
      logout()
      throw err
    }
  }

  // Tratamento de erros simplificado
  const handleErrors = (err) => {
    errors.value = {} // Limpa erros anteriores
    
    // Erro de conexão (sem resposta do servidor)
    if (!err.response) {
      errors.value.general = ['Erro de conexão']
      showError(err.code === 'ECONNABORTED' 
        ? 'A requisição demorou muito. Tente novamente.' 
        : 'A requisição demorou muito. verificar API')
      return
    }

    // Erros de validação (status 422)
    if (err.response.status === 422) {
      errors.value = err.response.data?.errors || {}
      
      // Mostra o primeiro erro que encontrar
      const firstError = Object.values(errors.value)[0]?.[0]
      if (firstError) {
        showError(firstError)
      }
    } 
    // Outros erros do servidor
    else {
      const defaultMessage = 'Ocorreu um erro inesperado. Por favor, tente novamente.'
      const serverMessage = err.response.data?.message || defaultMessage
      
      errors.value.general = [serverMessage]
      showError(serverMessage)
    }

    // Log para desenvolvimento
    console.error('Erro na autenticação:', err)
  }

  // Inicialização - configura token se existir
  if (token.value) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
  }

  // Retorna tudo que será usado nos componentes
  return {
    user,
    token,
    errors,
    isLoading,
    isAuthenticated,
    setToken,
    setUser,
    login,
    register,
    logout,
    refreshToken,
    setRememberedEmail,
    getRememberedEmail,
  }
})