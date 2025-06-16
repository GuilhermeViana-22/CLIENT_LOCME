import { defineStore } from 'pinia'
import perfisService from "@/services/perfis/perfis.js";
import {useToast} from "vue-toastification";
import {hideLoading, showFancyLoading} from "@/utils/swalCustoms.js";
import api from "@/services/api.js";
import {ref} from "vue";
import { useRouter } from 'vue-router'



export const usePerfilStore = defineStore('perfil', () => {
    const router = useRouter()

    const tiposPerfil = ref([]);
    const errors = ref({});
    const isLoading = ref(false);



    // Setters

    // Methods
    // Os dados do formulário e o auth do tipo de perfil que está sendo usado no formulário para mostrar os erros
    const submitCompletarPerfil = async(formData, perfilStore) => {
        const toast = useToast()

        perfilStore.setIsLoading(true);
        showFancyLoading();

        perfilStore.setErrors({});

        try {
            const dadosFiltrados = perfilStore.getDadosFiltrados(formData);

            // 1. Faz a requisição para enviar o formulário
            const data = await api.post('/perfil/completar', dadosFiltrados);

            // 3. Redireciona sem complicação
            router.push({ name: 'dashboard' });

            hideLoading();
            toast.success("Dados cadastrados com sucesso!", {
                    position: "bottom-right",
                    timeout: 3000
                })

        } catch (error) {
            handleErrors(error, perfilStore)
        } finally {
            perfilStore.setIsLoading(false);
        }
    };

    // Puxa os tipos de perfis disponíveis
    const fetchTiposPerfil = async () => {
        isLoading.value = true
        errors.value = null
        try {
            tiposPerfil.value = await perfisService.getTiposPerfis()
        } catch (error) {
            errors.value = error.message || 'Falha ao carregar tipos de perfil'
            console.error('Erro ao buscar tipos de perfil:', error)
        } finally {
            isLoading.value = false
        }
    };

    // Error Handling
    const handleErrors = (error, perfilStore = null) => {
        const toast = useToast()

        if (error.status == 422) {
            if(perfilStore){
                perfilStore.setErrors(error.errors || {});
            } else {
                errors.value = error.errors || {};
            }
        } else {
            toast.error(error.message || 'Ocorreu um erro. Tente novamente.', {
                position: "bottom-right",
                timeout: 3000
            })
        }
    }

    return {
        tiposPerfil,
        errors,
        isLoading,
        submitCompletarPerfil,
        fetchTiposPerfil,
        handleErrors
    }
})