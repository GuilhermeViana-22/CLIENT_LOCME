// src/stores/auth/auth.store.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()

  // State
  const user = ref(null)
  const token = ref(localStorage.getItem('auth_token') || null)
  const errors = ref({})
  const isLoading = ref(false)

  // Computed
  const isAuthenticated = computed(() => !!token.value)

  // Setters
  const setToken = (newToken) => {
    token.value = newToken
    localStorage.setItem('auth_token', newToken)
    api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
  }

  const setUser = (userData) => {
    // Filtra apenas os campos necessários
    user.value = userData ? {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      telefone_celular: userData.telefone_celular
      // Adicione outros campos que você realmente usa
    } : null
  }

  // Methods
  const register = async (formData) => {
    isLoading.value = true
    errors.value = {}

    try {
      const response = await api.post('/register', {
        name: formData.name.trim(),
        cpf: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        password_confirmation: formData.password_confirmation
      })

      console.log(response)

      setUser(response.data.user || null)
      setToken(response.data.token || null)

      await router.push({ name: 'login' })
      return response.data
    } catch (error) {
      handleErrors(error)
      throw error
    } finally {
      isLoading.value = false
    }
  }
  const login = async (formData) => {
    isLoading.value = true;
    errors.value = {};

    try {
      // 1. Faz a requisição de login diretamente
      const { data } = await api.post('/login', {
        email: formData.email.trim(),
        password: formData.password
      });

      // 2. Armazena o token (só isso é essencial)
      setToken(data.token);

      // 3. Redireciona sem complicação
      router.push({ name: 'dashboard' });

    } catch (error) {
      // Tratamento simples de erro
      errors.value = {
        general: [error.response?.data?.message || 'Login falhou']
      };
      console.error('Erro no login:', error);
    } finally {
      isLoading.value = false;
    }
  };

  const logout = () => {
    user.value = null
    token.value = null
    localStorage.removeItem('auth_token')
    delete api.defaults.headers.common['Authorization']
    router.push({ name: 'login' })
  }

  const refreshToken = async () => {
    try {
      const response = await api.post('/refresh-token')
      setToken(response.data.token)
      return response.data.token
    } catch (error) {
      logout()
      throw error
    }
  }

  // Error Handling
  const handleErrors = (error) => {
    if (error.response?.status === 422) {
      errors.value = error.response.data.errors || {}
    } else {
      errors.value = { general: [error.response?.data?.message || 'Ocorreu um erro. Tente novamente.'] }
    }
    console.error('❌ Erro:', errors.value)
  }

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
    refreshToken
  }
})