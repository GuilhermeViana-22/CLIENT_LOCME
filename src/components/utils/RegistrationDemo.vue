<template>
  <div class="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-gray-800 mb-2">
        🧠 Demonstração: Sequential Thinking no Registro
      </h2>
      <p class="text-gray-600">
        Este componente demonstra como o sequential thinking analisa e orienta o registro de agentes de viagem em tempo real.
      </p>
    </div>

    <!-- Formulário de Demonstração -->
    <div class="space-y-4 mb-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Nome Completo
        </label>
        <input
          v-model="demoForm.name"
          type="text"
          placeholder="Digite seu nome completo"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <input
          v-model="demoForm.email"
          type="email"
          placeholder="seu@email.com"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Senha
        </label>
        <input
          v-model="demoForm.password"
          type="password"
          placeholder="Digite sua senha"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Confirmar Senha
        </label>
        <input
          v-model="demoForm.password_confirmation"
          type="password"
          placeholder="Confirme sua senha"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Tipo de Perfil
        </label>
        <select
          v-model="demoForm.tipo_perfil_id"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Selecione o tipo de perfil</option>
          <option value="agente_viagem">Agente de Viagem</option>
          <option value="representante">Representante</option>
          <option value="cliente">Cliente</option>
        </select>
      </div>
    </div>

    <!-- Análise em Tempo Real -->
    <div v-if="currentAnalysis" class="mb-6">
      <h3 class="text-lg font-semibold text-gray-800 mb-3 flex items-center">
        <i class="fas fa-brain text-blue-600 mr-2"></i>
        Análise Sequential Thinking
      </h3>

      <!-- Processo de Pensamento -->
      <div class="bg-gray-50 p-4 rounded-lg mb-4">
        <h4 class="font-medium text-gray-700 mb-2">
          <i class="fas fa-cog text-gray-600 mr-1"></i>
          Processo de Pensamento:
        </h4>
        <div class="space-y-1 text-sm text-gray-600">
          <div v-for="(thought, index) in currentAnalysis.thoughts" :key="index" class="flex items-start">
            <span class="text-blue-500 mr-2">{{ index + 1 }}.</span>
            <span>{{ thought }}</span>
          </div>
        </div>
      </div>

      <!-- Score de Completude -->
      <div class="mb-4">
        <div class="flex justify-between items-center mb-2">
          <span class="text-sm font-medium text-gray-700">
            Completude do Perfil:
          </span>
          <span class="text-sm font-semibold" :class="getScoreColor(currentAnalysis.completionScore)">
            {{ currentAnalysis.completionScore }}%
          </span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div 
            class="h-2 rounded-full transition-all duration-500"
            :class="getProgressBarColor(currentAnalysis.completionScore)"
            :style="{ width: currentAnalysis.completionScore + '%' }"
          ></div>
        </div>
      </div>

      <!-- Validações -->
      <div v-if="currentAnalysis.validation && currentAnalysis.validation.length > 0" class="mb-4">
        <h4 class="font-medium text-red-700 mb-2">
          <i class="fas fa-exclamation-triangle mr-1"></i>
          Problemas Encontrados:
        </h4>
        <div class="space-y-2">
          <div 
            v-for="error in currentAnalysis.validation" 
            :key="error.field"
            class="flex items-start p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700"
          >
            <i class="fas fa-times-circle mr-2 mt-0.5"></i>
            <span>{{ error.message }}</span>
          </div>
        </div>
      </div>

      <!-- Sugestões -->
      <div v-if="currentAnalysis.suggestions && currentAnalysis.suggestions.length > 0" class="mb-4">
        <h4 class="font-medium text-blue-700 mb-2">
          <i class="fas fa-lightbulb mr-1"></i>
          Sugestões Inteligentes:
        </h4>
        <div class="space-y-2">
          <div 
            v-for="suggestion in currentAnalysis.suggestions" 
            :key="suggestion.field + suggestion.message"
            class="flex items-start p-2 rounded text-sm"
            :class="getSuggestionStyle(suggestion.type)"
          >
            <i :class="getSuggestionIcon(suggestion.type)" class="mr-2 mt-0.5"></i>
            <span>{{ suggestion.message }}</span>
          </div>
        </div>
      </div>

      <!-- Status de Pronto -->
      <div v-if="currentAnalysis.isReadyToSubmit" class="p-3 bg-green-50 border border-green-200 rounded-lg">
        <div class="flex items-center">
          <i class="fas fa-check-circle text-green-600 mr-2"></i>
          <span class="text-green-800 font-medium">
            ✅ Formulário pronto para envio!
          </span>
        </div>
      </div>
    </div>

    <!-- Botões de Ação -->
    <div class="flex gap-4">
      <button
        @click="analyzeForm"
        :disabled="isAnalyzing"
        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
      >
        <i class="fas fa-sync-alt mr-2" :class="{ 'animate-spin': isAnalyzing }"></i>
        {{ isAnalyzing ? 'Analisando...' : 'Analisar Formulário' }}
      </button>

      <button
        @click="clearForm"
        class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
      >
        <i class="fas fa-trash mr-2"></i>
        Limpar Formulário
      </button>
    </div>

    <!-- Informações Técnicas -->
    <div class="mt-8 p-4 bg-gray-50 rounded-lg">
      <h4 class="font-medium text-gray-800 mb-2">
        <i class="fas fa-info-circle mr-1"></i>
        Como Funciona:
      </h4>
      <ul class="text-sm text-gray-600 space-y-1">
        <li>• O sistema usa <strong>sequential thinking</strong> para analisar o contexto do formulário</li>
        <li>• Cada campo é avaliado considerando o tipo de perfil selecionado</li>
        <li>• Sugestões são geradas baseadas em padrões profissionais para agentes de viagem</li>
        <li>• A análise é atualizada em tempo real conforme o usuário preenche os campos</li>
        <li>• O sistema previne erros antes da submissão do formulário</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import registrationAssistant from '@/services/registrationAssistant'

const demoForm = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  tipo_perfil_id: ''
})

const currentAnalysis = ref(null)
const isAnalyzing = ref(false)

// Auto-análise quando o formulário muda
watch(demoForm, async () => {
  if (demoForm.value.tipo_perfil_id === 'agente_viagem') {
    await analyzeForm()
  }
}, { deep: true })

const analyzeForm = async () => {
  if (!demoForm.value.tipo_perfil_id) {
    currentAnalysis.value = null
    return
  }

  isAnalyzing.value = true
  try {
    const result = await registrationAssistant.analyzeRegistrationForm(
      demoForm.value,
      demoForm.value.tipo_perfil_id
    )
    currentAnalysis.value = result
  } catch (error) {
    console.error('Erro na análise:', error)
  } finally {
    isAnalyzing.value = false
  }
}

const clearForm = () => {
  demoForm.value = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    tipo_perfil_id: ''
  }
  currentAnalysis.value = null
}

const getScoreColor = (score) => {
  if (score >= 80) return 'text-green-600'
  if (score >= 60) return 'text-yellow-600'
  return 'text-red-600'
}

const getProgressBarColor = (score) => {
  if (score >= 80) return 'bg-green-500'
  if (score >= 60) return 'bg-yellow-500'
  return 'bg-red-500'
}

const getSuggestionStyle = (type) => {
  const styles = {
    'error': 'bg-red-50 border border-red-200 text-red-700',
    'warning': 'bg-yellow-50 border border-yellow-200 text-yellow-700',
    'info': 'bg-blue-50 border border-blue-200 text-blue-700',
    'success': 'bg-green-50 border border-green-200 text-green-700',
    'tip': 'bg-purple-50 border border-purple-200 text-purple-700'
  }
  return styles[type] || 'bg-gray-50 border border-gray-200 text-gray-700'
}

const getSuggestionIcon = (type) => {
  const icons = {
    'error': 'fas fa-exclamation-circle text-red-500',
    'warning': 'fas fa-exclamation-triangle text-yellow-500',
    'info': 'fas fa-info-circle text-blue-500',
    'success': 'fas fa-check-circle text-green-500',
    'tip': 'fas fa-lightbulb text-purple-500'
  }
  return icons[type] || 'fas fa-info-circle text-gray-500'
}
</script>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style> 