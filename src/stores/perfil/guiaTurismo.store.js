import { defineStore } from 'pinia'
import { ref } from 'vue'
import { usePerfilStore } from './perfil.store.js'

export const useGuiaTurismoStore = defineStore('guiaTurismo', () => {
    const perfilStore = usePerfilStore()

    // Estado dos dados do formulário
    const formData = ref({
        apelido: '',
        whatsapp: '',
        email_contato: '',
        data_nascimento: '',
        cadastur: '',
        abrangencia_id: ''
    })

    // Estado de carregamento e erros
    const isLoading = ref(false)
    const errors = ref({})

    // Getters
    const getDadosFiltrados = (data) => {
        // Remove campos vazios e prepara dados para envio
        const filteredData = {}
        
        Object.keys(data).forEach(key => {
            if (data[key] !== '' && data[key] !== null && data[key] !== undefined) {
                filteredData[key] = data[key]
            }
        })

        return filteredData
    }

    // Setters
    const setFormData = (data) => {
        formData.value = { ...formData.value, ...data }
    }

    const setIsLoading = (loading) => {
        isLoading.value = loading
    }

    const setErrors = (newErrors) => {
        errors.value = newErrors || {}
    }

    const clearErrors = () => {
        errors.value = {}
    }

    // Actions
    const submitForm = async () => {
        try {
            setIsLoading(true)
            clearErrors()

            await perfilStore.submitCompletarPerfil(formData.value, {
                setIsLoading,
                setErrors,
                getDadosFiltrados
            })

        } catch (error) {
            console.error('Erro ao submeter formulário de guia:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const resetForm = () => {
        formData.value = {
            apelido: '',
            whatsapp: '',
            email_contato: '',
            data_nascimento: '',
            cadastur: '',
            abrangencia_id: ''
        }
        clearErrors()
    }

    // Validações específicas
    const validateAge = (birthDate) => {
        if (!birthDate) return false
        
        const today = new Date()
        const birth = new Date(birthDate)
        const age = today.getFullYear() - birth.getFullYear()
        
        // Verifica se já fez aniversário este ano
        const monthDiff = today.getMonth() - birth.getMonth()
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            return age - 1 >= 18
        }
        
        return age >= 18
    }

    const validatePhone = (phone) => {
        const cleanPhone = phone.replace(/\D/g, '')
        return cleanPhone.length >= 10 && cleanPhone.length <= 11
    }

    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailPattern.test(email)
    }

    const formatDate = (dateString) => {
        if (!dateString) return ''
        const date = new Date(dateString)
        return date.toLocaleDateString('pt-BR')
    }

    const calculateAge = (birthDate) => {
        if (!birthDate) return 0
        
        const today = new Date()
        const birth = new Date(birthDate)
        let age = today.getFullYear() - birth.getFullYear()
        
        const monthDiff = today.getMonth() - birth.getMonth()
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--
        }
        
        return age
    }

    return {
        // State
        formData,
        isLoading,
        errors,
        
        // Getters
        getDadosFiltrados,
        
        // Setters
        setFormData,
        setIsLoading,
        setErrors,
        clearErrors,
        
        // Actions
        submitForm,
        resetForm,
        
        // Validations & Utilities
        validateAge,
        validatePhone,
        validateEmail,
        formatDate,
        calculateAge
    }
}) 