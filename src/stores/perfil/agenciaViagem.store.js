import { defineStore } from 'pinia'
import { ref } from 'vue'
import { usePerfilStore } from './perfil.store.js'
import {useRouter} from "vue-router";

export const useAgenciaViagemStore = defineStore('agenciaViagem', () => {
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
            nome_agencia: formData.nome_agencia,
            cnpj: formData.cnpj,
            razao_social: formData.razao_social,
            nome_fantasia: formData.nome_fantasia,
            email_institucional: formData.email_institucional,
            telefone_whatsapp: formData.telefone_whatsapp,
            cidade: formData.cidade,
            uf: formData.uf,
            endereco_completo: formData.endereco_completo,
            cep: formData.cep,
            tipo_operacao: formData.tipo_operacao,
            recebe_representantes: formData.recebe_representantes,
            necessita_agendamento: formData.necessita_agendamento,
            atende_freelance: formData.atende_freelance,
            cadastur: formData.cadastur,
            instagram: formData.instagram,
            segmento_principal_id: formData.segmento_principal_id,
            excursoes_proprias: formData.excursoes_proprias,
            aceita_excursoes_outras: formData.aceita_excursoes_outras,
            descricao_livre: formData.descricao_livre,
            logo_path: formData.logo_path,
            divulgar: formData.divulgar
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