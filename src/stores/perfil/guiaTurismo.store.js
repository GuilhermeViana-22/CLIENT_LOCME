import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGuiaTurismoStore = defineStore('guiaTurismo', () => {
    // Estado básico
    const errors = ref({})
    const isLoading = ref(false)

    // Getter padrão para filtro de dados
    const getDadosFiltrados = (formData = {}) => ({
        cpf: formData.cpf,
        bio: formData.bio,
        apelido: formData.apelido,
        whatsapp: formData.whatsapp,
        email_contato: formData.email_contato,
        data_nascimento: formData.data_nascimento,
        cadastur: formData.cadastur,
        abrangencia_id: formData.abrangencia_id
    })

    // Controle de estado
    const setIsLoading = (loading) => {
        isLoading.value = loading
    }

    const setErrors = (errorData) => {
        errors.value = errorData || {}
    }

    return {
        // State
        errors,
        isLoading,

        // Getters
        getDadosFiltrados,

        // Setters
        setIsLoading,
        setErrors
    }
})