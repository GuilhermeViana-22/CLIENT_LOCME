import { defineStore } from 'pinia'
import { ref } from 'vue'
import { usePerfilStore } from './perfil.store.js'

export const useAgenciaViagemStore = defineStore('agenciaViagem', () => {
    const perfilStore = usePerfilStore()

    // Estado dos dados do formulário
    const formData = ref({
        nome_agencia: '',
        cnpj: '',
        razao_social: '',
        nome_fantasia: '',
        email_institucional: '',
        telefone_whatsapp: '',
        cidade: '',
        uf: '',
        endereco_completo: '',
        cep: '',
        tipo_operacao: '',
        recebe_representantes: false,
        necessita_agendamento: false,
        atende_freelance: false,
        cadastur: '',
        instagram: '',
        segmento_principal_id: '',
        excursoes_proprias: '',
        aceita_excursoes_outras: '',
        descricao_livre: '',
        logo_path: '',
        divulgar: false
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
            console.error('Erro ao submeter formulário de agência:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const resetForm = () => {
        formData.value = {
            nome_agencia: '',
            cnpj: '',
            razao_social: '',
            nome_fantasia: '',
            email_institucional: '',
            telefone_whatsapp: '',
            cidade: '',
            uf: '',
            endereco_completo: '',
            cep: '',
            tipo_operacao: '',
            recebe_representantes: false,
            necessita_agendamento: false,
            atende_freelance: false,
            cadastur: '',
            instagram: '',
            segmento_principal_id: '',
            excursoes_proprias: '',
            aceita_excursoes_outras: '',
            descricao_livre: '',
            logo_path: '',
            divulgar: false
        }
        clearErrors()
    }

    // Validações específicas
    const validateCNPJ = (cnpj) => {
        // Remove caracteres não numéricos
        const cleanCNPJ = cnpj.replace(/[^\d]/g, '')
        
        if (cleanCNPJ.length !== 14) return false
        
        // Validação básica de CNPJ
        if (/^(\d)\1{13}$/.test(cleanCNPJ)) return false
        
        // Algoritmo de validação do CNPJ
        let tamanho = cleanCNPJ.length - 2
        let numeros = cleanCNPJ.substring(0, tamanho)
        let digitos = cleanCNPJ.substring(tamanho)
        let soma = 0
        let pos = tamanho - 7
        
        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--
            if (pos < 2) pos = 9
        }
        
        let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
        if (resultado !== parseInt(digitos.charAt(0))) return false
        
        tamanho = tamanho + 1
        numeros = cleanCNPJ.substring(0, tamanho)
        soma = 0
        pos = tamanho - 7
        
        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--
            if (pos < 2) pos = 9
        }
        
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
        return resultado === parseInt(digitos.charAt(1))
    }

    const validateCEP = (cep) => {
        const cleanCEP = cep.replace(/[^\d]/g, '')
        return cleanCEP.length === 8
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
        
        // Validations
        validateCNPJ,
        validateCEP
    }
}) 