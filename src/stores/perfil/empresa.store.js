import { defineStore } from 'pinia';
import { ref } from 'vue';
import { usePerfilStore } from './perfil.store.js';

export const useEmpresaStore = defineStore('empresa', () => {
  const perfilStore = usePerfilStore();

  // Estado dos dados do formulário
  const formData = ref({
    nome_empresa: '',
    telefone: '',
    email_contato: '',
    url: '',
    cadastur: '',
    condicoes_especiais: false,
    condicoes: '',
    atividade_id: '',
    unidades_localidades: '',
    produtos_servicos: '',
    nome_cadastro: '',
    cargo_cadastro: '',
    endereco: '',
    cidade: '',
    estado: '',
    cep: '',
    pais: ''
  });

  // Estado de carregamento e erros
  const isLoading = ref(false);
  const errors = ref({});

  // Getters
  const getDadosFiltrados = (data) => {
    const filteredData = {};
    Object.keys(data).forEach(key => {
      if (data[key] !== '' && data[key] !== null && data[key] !== undefined) {
        filteredData[key] = data[key];
      }
    });
    return filteredData;
  };

  // Setters
  const setFormData = (data) => {
    formData.value = { ...formData.value, ...data };
  };

  const setIsLoading = (loading) => {
    isLoading.value = loading;
  };

  const setErrors = (newErrors) => {
    errors.value = newErrors || {};
  };

  const clearErrors = () => {
    errors.value = {};
  };

  // Actions
  const submitForm = async () => {
    try {
      setIsLoading(true);
      clearErrors();
      await perfilStore.submitCompletarPerfil(formData.value, {
        setIsLoading,
        setErrors,
        getDadosFiltrados
      });
    } catch (error) {
      console.error('Erro ao submeter formulário de empresa:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    formData.value = {
      nome_empresa: '',
      telefone: '',
      email_contato: '',
      url: '',
      cadastur: '',
      condicoes_especiais: false,
      condicoes: '',
      atividade_id: '',
      unidades_localidades: '',
      produtos_servicos: '',
      nome_cadastro: '',
      cargo_cadastro: '',
      endereco: '',
      cidade: '',
      estado: '',
      cep: '',
      pais: ''
    };
    clearErrors();
  };

  return {
    formData,
    isLoading,
    errors,
    setFormData,
    setIsLoading,
    setErrors,
    clearErrors,
    getDadosFiltrados,
    submitForm,
    resetForm
  };
}); 