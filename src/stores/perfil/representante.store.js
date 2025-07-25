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
            nome: formData.nome,
            cpf: formData.cpf,
            bio: formData.bio,
            whatsapp: formData.whatsapp,
            email_contato: formData.email_contato,
            data_nascimento: formData.data_nascimento,
            operadora_id: formData.operadora_id,
            empresa_id: formData.empresa_id,
            empresa_outra: formData.empresa_outra,
            telefone_vendas: formData.telefone_vendas,
            url: formData.url,
            endereco: formData.endereco.endereco,
            cidade: formData.endereco.cidade,
            estado: formData.endereco.estado,
            cep: formData.endereco.cep,
            pais: formData.endereco.pais,
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