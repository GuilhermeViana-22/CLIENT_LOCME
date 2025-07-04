import { defineStore } from 'pinia'
import {ref} from "vue";
import { useRouter } from 'vue-router'

export const useAgenteViagemStore = defineStore('agenteViagem', () => {
    const router = useRouter()

    const errors = ref({});
    const isLoading = ref(false);

    // Setters
    const setIsLoading = (isloading) => {
        isLoading.value = isloading;
    }
    const setErrors = (errorssss) => {
        errors.value = errorssss;
    }

    // Getters
    // Retorna os campos dessa store que serão enviados para o backend
    const getDadosFiltrados = (formData = {}) => {
        return {
            apelido: formData.apelido,
            email: formData.email,
            nome_completo: formData.nome_completo,
            cpf: formData.cpf,
            whatsapp: formData.whatsapp,
            cidade: formData.cidade,
            uf: formData.uf,
            vinculado_agencia: formData.vinculado_agencia || false,
            cnpj_agencia_vinculada: formData.cnpj_agencia_vinculada || '',
            tem_cnpj_proprio: formData.tem_cnpj_proprio || false,
            portfolio_redes_sociais: formData.portfolio_redes_sociais || '',
            aceita_contato_representantes: formData.aceita_contato_representantes || false
        }
    }

    // TEM QUE TER:
    // errors,
    // isLoading,
    // setIsLoading,
    // setErrors
    // getDadosFiltrados
    return {
        errors,
        isLoading,
        setIsLoading,
        setErrors,
        getDadosFiltrados
    }
}) 