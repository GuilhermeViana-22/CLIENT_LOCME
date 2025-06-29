import { defineStore } from 'pinia'
import {ref} from "vue";
import { useRouter } from 'vue-router'

export const useRepresentateStore = defineStore('representante', () => {
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
            whatsapp: formData.whatsapp,
            email_contato: formData.email_contato,
            data_nascimento: formData.data_nascimento,
            operadora_id: formData.operadora_id,
            empresa_id: formData.empresa_id,
            empresa_outra: formData.empresa_outra,
            telefone_vendas: formData.telefone_vendas,
            url: formData.url,
            endereco: formData.endereco,
            cidade: formData.cidade,
            estado: formData.estado,
            cep: formData.cep,
            pais: formData.pais,
            disponivel: formData.disponivel,
            cv: formData.cv
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