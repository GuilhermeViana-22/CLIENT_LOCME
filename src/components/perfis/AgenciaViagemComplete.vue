<template>
  <div class="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
    <!-- Header -->
    <div class="border-b border-gray-200 pb-4 mb-6">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <i class="fas fa-building text-blue-600 text-3xl"></i>
        </div>
        <div class="ml-4">
          <h1 class="text-2xl font-bold text-gray-900">
            Complete seu Perfil - Agência de Viagem
          </h1>
          <p class="text-gray-600 mt-1">
            Preencha as informações da sua agência para ter acesso completo ao sistema
          </p>
        </div>
      </div>
    </div>

    <!-- Progress Bar -->
    <div class="mb-6">
      <div class="flex justify-between items-center mb-2">
        <span class="text-sm font-medium text-gray-700">Progresso do cadastro:</span>
        <span class="text-sm font-semibold text-blue-600">{{ completionPercentage }}%</span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2">
        <div 
          class="bg-blue-600 h-2 rounded-full transition-all duration-500"
          :style="{ width: completionPercentage + '%' }"
        ></div>
      </div>
    </div>

    <!-- Alert de Informações -->
    <InfoAlert 
      type="info" 
      title="Informações Importantes"
      class="mb-6"
    >
      <p class="text-sm">
        <i class="fas fa-info-circle mr-2"></i>
        Todos os campos marcados com <span class="text-red-500 font-semibold">*</span> são obrigatórios.
        Estas informações serão utilizadas para conectar sua agência com representantes e fornecedores.
      </p>
    </InfoAlert>

    <!-- Formulário -->
    <form @submit.prevent="handleSubmit" class="space-y-6">
      
      <!-- Informações Básicas da Agência -->
      <div class="bg-gray-50 p-6 rounded-lg">
        <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <i class="fas fa-building mr-2 text-blue-600"></i>
          Informações Básicas da Agência
        </h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AgenciaViagemForm
            v-model="store.formData"
            :required="true"
            :disabled="store.isLoading"
          />
        </div>
      </div>

      <!-- Informações de Localização -->
      <div class="bg-gray-50 p-6 rounded-lg">
        <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <i class="fas fa-map-marker-alt mr-2 text-green-600"></i>
          Localização
        </h3>
        <div class="text-sm text-gray-600 mb-4">
          <i class="fas fa-info-circle mr-2"></i>
          Essas informações ajudam representantes a localizar sua agência
        </div>
        <!-- Os campos de localização já estão incluídos no AgenciaViagemForm -->
      </div>

      <!-- Informações Comerciais -->
      <div class="bg-gray-50 p-6 rounded-lg">
        <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <i class="fas fa-handshake mr-2 text-purple-600"></i>
          Informações Comerciais
        </h3>
        <div class="text-sm text-gray-600 mb-4">
          <i class="fas fa-info-circle mr-2"></i>
          Configure como sua agência interage com representantes e parceiros
        </div>
        <!-- Os campos comerciais já estão incluídos no AgenciaViagemForm -->
      </div>

      <!-- Informações Adicionais -->
      <div class="bg-gray-50 p-6 rounded-lg">
        <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <i class="fas fa-star mr-2 text-yellow-600"></i>
          Informações Adicionais
        </h3>
        <div class="text-sm text-gray-600 mb-4">
          <i class="fas fa-info-circle mr-2"></i>
          Adicione informações que destacam sua agência no mercado
        </div>
        <!-- Os campos adicionais já estão incluídos no AgenciaViagemForm -->
      </div>

      <!-- Botões de Ação -->
      <div class="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
        <ButtonSubmit
          :is-loading="store.isLoading"
          :disabled="!isFormValid"
          loading-text="Salvando..."
          class="flex-1"
        >
          <i class="fas fa-save mr-2"></i>
          Completar Cadastro
        </ButtonSubmit>

        <button
          type="button"
          @click="resetForm"
          :disabled="store.isLoading"
          class="px-6 py-3 border border-gray-300 text-gray-700 bg-white rounded-md hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <i class="fas fa-undo mr-2"></i>
          Limpar Formulário
        </button>
      </div>
    </form>

    <!-- Informações de Ajuda -->
    <div class="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
      <h4 class="font-semibold text-blue-900 mb-2 flex items-center">
        <i class="fas fa-question-circle mr-2"></i>
        Precisa de Ajuda?
      </h4>
      <div class="text-sm text-blue-800 space-y-2">
        <p>• <strong>CNPJ:</strong> Cadastro Nacional da Pessoa Jurídica da sua agência</p>
        <p>• <strong>CADASTUR:</strong> Cadastro dos Prestadores de Serviços Turísticos</p>
        <p>• <strong>Tipo de Operação:</strong> Categoria da sua empresa no turismo</p>
        <p>• <strong>Segmento Principal:</strong> Área de especialização da agência</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useAgenciaViagemStore } from '@/stores/perfil/agenciaViagem.store.js'
import AgenciaViagemForm from '@/components/perfis/forms/agencia_viagem_form.vue'
import ButtonSubmit from '@/components/formulario/ButtonSubmit.vue'
import InfoAlert from '@/components/utils/InfoAlert.vue'

const store = useAgenciaViagemStore()

// Computed Properties
const completionPercentage = computed(() => {
  const formData = store.formData
  const requiredFields = [
    'nome_agencia', 'cnpj', 'razao_social', 'nome_fantasia', 
    'email_institucional', 'telefone_whatsapp', 'cidade', 'uf',
    'endereco_completo', 'cep', 'tipo_operacao', 'cadastur',
    'segmento_principal_id', 'excursoes_proprias', 'aceita_excursoes_outras'
  ]
  
  const filledFields = requiredFields.filter(field => {
    const value = formData[field]
    return value !== '' && value !== null && value !== undefined
  })
  
  return Math.round((filledFields.length / requiredFields.length) * 100)
})

const isFormValid = computed(() => {
  const formData = store.formData
  
  // Campos obrigatórios básicos
  const requiredFields = [
    'nome_agencia', 'cnpj', 'razao_social', 'email_institucional',
    'telefone_whatsapp', 'cidade', 'uf', 'tipo_operacao'
  ]
  
  const hasRequiredFields = requiredFields.every(field => {
    const value = formData[field]
    return value !== '' && value !== null && value !== undefined
  })
  
  // Validação de CNPJ
  const isCNPJValid = store.validateCNPJ(formData.cnpj)
  
  // Validação de CEP (se preenchido)
  const isCEPValid = !formData.cep || store.validateCEP(formData.cep)
  
  return hasRequiredFields && isCNPJValid && isCEPValid
})

// Methods
const handleSubmit = async () => {
  if (!isFormValid.value) {
    store.setErrors({
      form: ['Por favor, preencha todos os campos obrigatórios corretamente.']
    })
    return
  }
  
  await store.submitForm()
}

const resetForm = () => {
  if (confirm('Tem certeza que deseja limpar todos os dados do formulário?')) {
    store.resetForm()
  }
}

// Lifecycle
onMounted(() => {
  // Inicialização se necessário
  console.log('🏢 Componente AgenciaViagemComplete montado')
})
</script>

<style scoped>
/* Estilos específicos do componente */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Animação para o progress bar */
@keyframes progress-animation {
  0% {
    width: 0%;
  }
  100% {
    width: var(--progress-width);
  }
}

/* Hover effects */
.hover\:shadow-lg:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
</style> 