import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useEmpresaStore = defineStore('empresa', () => {
  // Estado básico
  const errors = ref({})
  const isLoading = ref(false)

  // Getter padrão para filtro de dados
  const getDadosFiltrados = (formData = {}) => ({
    cnpj: formData.cnpj,
    nome_empresa: formData.nome_empresa,
    telefone: formData.telefone,
    email_contato: formData.email_contato,

    url: formData.url || '',
    cadastur: formData.cadastur || '',

    condicoes_especiais: formData.condicoes_especiais,
    condicoes: formData.condicoes || '',

    atividades: formData.atividades || [],
    unidades_localidades: formData.unidades_localidades || [],
    produtos_servicos: formData.produtos_servicos || [],

    nome_cadastro: formData.nome_cadastro,
    cargo_cadastro: formData.cargo_cadastro,

    endereco: formData.endereco.endereco,
    cidade: formData.endereco.cidade,
    estado: formData.endereco.estado,
    cep: formData.endereco.cep,
    pais: formData.endereco.pais
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