// src/stores/auth/auth.store.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'
import { useToast } from 'vue-toastification'
import { showFancyLoading, hideLoading } from '@/utils/swalCustoms.js';

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
      // Adicione outros campos que você realmente usa
    } : null
  }

  // Methods
  const register = async (formData) => {
    const toast = useToast()

    isLoading.value = true
    showFancyLoading();

    errors.value = {}

    try {
      const response = await api.post('/register', {
        name: formData.name.trim(),
        cpf: formData.cpf.trim(),
        email: formData.email.trim(),
        password: formData.password,
        password_confirmation: formData.password_confirmation
      })

      console.log(response);

      setUser(response.user || null)
      setToken(response.access_token || null)

      router.push({ name: 'dashboard' })

      hideLoading();
      toast.success("Bem-vindo!", {
        position: "bottom-right",
        timeout: 3000
      })

      return response.data
    } catch (error) {

      hideLoading();
      handleErrors(error)
      throw error
    } finally {
      isLoading.value = false
    }
  }
  const login = async (formData) => {
    const toast = useToast()

    isLoading.value = true;
    showFancyLoading();

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

      hideLoading();
      toast.success("Bem-vindo de volta!", {
        position: "bottom-right",
        timeout: 3000
      })

    } catch (error) {
      toast.error(error.message || 'Login falhou', {
        position: "bottom-right",
        timeout: 3000
      })

      hideLoading();
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

    if (error.status == 422) {
      errors.value = error.errors || {}
    } else {
      toast.error(error.message || 'Ocorreu um erro. Tente novamente.', {
        position: "bottom-right",
        timeout: 3000
      })
    }
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