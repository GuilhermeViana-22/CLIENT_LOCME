// src/stores/auth/auth.store.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { showFancyLoading, hideLoading } from '@/utils/swalCustoms.js';
import api from '@/services/api'
import users from "@/services/users/users.js";

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
    /// depois a gente foca em filtrar, manda tudo
    user.value = userData ? userData : null
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
        tipo_perfil_id: formData.tipo_perfil_id,
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
      const data = await api.post('/login', {
        email: formData.email.trim(),
        password: formData.password
      });

      // 2. Armazena o token (só isso é essencial)
      setToken(data.token);
      setUser(data.user);

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
    const toast = useToast()
    showFancyLoading();

    user.value = null
    token.value = null
    localStorage.removeItem('auth_token')
    delete api.defaults.headers.common['Authorization']
    router.push({ name: 'login' })

    toast.success("Sua conta foi deslogada!", {
      position: "bottom-right",
      timeout: 3000
    })
    hideLoading();
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
  const initializeAuth = async () => {
    if (token.value && !user.value) {
      try {
        this.isLoading = true;
        const { data } = await api.get('/me')
        setUser(data)
      } catch (error) {
        console.error('Falha ao carregar user:', error)
        logout()
      } finally {
        this.isLoading = false;
      }
    }
  }
  const updateProfilePhoto = async (file) => {
    const toast = useToast()
    showFancyLoading()

    try {
      const formData = new FormData()
      formData.append('foto_perfil', file)

      // Chamada para o backend Laravel
      const response = await users.updateAvatar(formData);

      // Atualiza o usuário no store com a nova foto
      setUser( {
        ...user.value,
        foto_perfil_url: response.foto_perfil_url
      });

      toast.success("Foto de perfil atualizada com sucesso!", {
        position: "bottom-right",
        timeout: 3000
      })

      return response.data
    } catch (error) {
      toast.error(error.response?.data?.message || "Erro ao atualizar foto de perfil", {
        position: "bottom-right",
        timeout: 3000
      })
      throw error
    } finally {
      hideLoading()
    }
  }

  // Error Handling
  const handleErrors = (error) => {
    const toast = useToast()

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
    refreshToken,
    initializeAuth,
    updateProfilePhoto
  }
})