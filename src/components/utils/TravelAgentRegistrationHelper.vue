<template>
  <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 transition-all duration-300">
    <!-- Header -->
    <div class="flex items-center mb-3">
      <div class="flex-shrink-0">
        <i class="fas fa-plane text-blue-600 text-xl"></i>
      </div>
      <div class="ml-3">
        <h3 class="text-lg font-semibold text-blue-900">
          Assistente de Registro - Agente de Viagem
        </h3>
        <p class="text-sm text-blue-700">
          Orientações personalizadas para seu perfil profissional
        </p>
      </div>
      <div class="ml-auto">
        <button 
          @click="$emit('close')"
          class="text-blue-400 hover:text-blue-600 transition-colors"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>

    <!-- Progress Bar -->
    <div class="mb-4">
      <div class="flex justify-between items-center mb-2">
        <span class="text-sm font-medium text-blue-700">Progresso do Registro:</span>
        <span class="text-sm font-semibold text-blue-900">{{ completionScore }}%</span>
      </div>
      <div class="w-full bg-blue-100 rounded-full h-2">
        <div 
          class="bg-blue-600 h-2 rounded-full transition-all duration-500"
          :style="{ width: completionScore + '%' }"
        ></div>
      </div>
    </div>

    <!-- Validations (Errors) -->
    <div v-if="analysis.validation && analysis.validation.length > 0" class="mb-4">
      <h4 class="text-sm font-semibold text-red-700 mb-2 flex items-center">
        <i class="fas fa-exclamation-triangle mr-2"></i>
        Campos Obrigatórios
      </h4>
      <div class="space-y-2">
        <div 
          v-for="error in analysis.validation" 
          :key="error.field"
          class="flex items-start p-2 bg-red-50 border border-red-200 rounded text-sm"
        >
          <i class="fas fa-times-circle text-red-500 mt-0.5 mr-2 flex-shrink-0"></i>
          <span class="text-red-700">{{ error.message }}</span>
        </div>
      </div>
    </div>

    <!-- Suggestions -->
    <div v-if="analysis.suggestions && analysis.suggestions.length > 0" class="mb-4">
      <h4 class="text-sm font-semibold text-blue-700 mb-2 flex items-center">
        <i class="fas fa-lightbulb mr-2"></i>
        Sugestões e Dicas
      </h4>
      <div class="space-y-2">
        <div 
          v-for="suggestion in analysis.suggestions" 
          :key="suggestion.field + suggestion.message"
          class="flex items-start p-2 rounded text-sm"
          :class="getSuggestionClass(suggestion.type)"
        >
          <i 
            :class="getSuggestionIcon(suggestion.type)" 
            class="mt-0.5 mr-2 flex-shrink-0"
          ></i>
          <span>{{ suggestion.message }}</span>
        </div>
      </div>
    </div>

    <!-- Ready to Submit -->
    <div v-if="analysis.isReadyToSubmit" class="mb-4">
      <div class="flex items-center p-3 bg-green-50 border border-green-200 rounded-lg">
        <i class="fas fa-check-circle text-green-600 mr-3"></i>
        <div>
          <p class="text-sm font-semibold text-green-800">
            ✅ Pronto para registrar!
          </p>
          <p class="text-xs text-green-700">
            Todos os campos obrigatórios estão preenchidos corretamente.
          </p>
        </div>
      </div>
    </div>

    <!-- Professional Tips -->
    <div class="border-t border-blue-200 pt-3">
      <h4 class="text-sm font-semibold text-blue-700 mb-2 flex items-center">
        <i class="fas fa-star mr-2"></i>
        Dicas para Agentes de Viagem
      </h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-blue-600">
        <div class="flex items-center">
          <i class="fas fa-check text-green-500 mr-1"></i>
          <span>Use nome completo e profissional</span>
        </div>
        <div class="flex items-center">
          <i class="fas fa-check text-green-500 mr-1"></i>
          <span>Email profissional gera mais confiança</span>
        </div>
        <div class="flex items-center">
          <i class="fas fa-check text-green-500 mr-1"></i>
          <span>Senha forte protege sua conta</span>
        </div>
        <div class="flex items-center">
          <i class="fas fa-check text-green-500 mr-1"></i>
          <span>Complete o perfil após registro</span>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex justify-between items-center mt-4 pt-3 border-t border-blue-200">
      <button 
        @click="refreshAnalysis"
        class="text-sm text-blue-600 hover:text-blue-800 transition-colors flex items-center"
        :disabled="isAnalyzing"
      >
        <i class="fas fa-sync-alt mr-1" :class="{ 'animate-spin': isAnalyzing }"></i>
        Atualizar Análise
      </button>
      
      <div class="text-xs text-blue-500">
        <i class="fas fa-robot mr-1"></i>
        Assistente Inteligente
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import registrationAssistant from '@/services/registrationAssistant'

const props = defineProps({
  formData: {
    type: Object,
    required: true
  },
  profileType: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['close', 'analysis-updated'])

const analysis = ref({
  suggestions: [],
  validation: [],
  completionScore: 0,
  isReadyToSubmit: false
})

const isAnalyzing = ref(false)

const completionScore = computed(() => analysis.value.completionScore || 0)

// Watch for changes in form data
watch(() => props.formData, async (newData) => {
  if (newData && props.profileType === 'agente_viagem') {
    await analyzeForm()
  }
}, { deep: true, immediate: true })

const analyzeForm = async () => {
  isAnalyzing.value = true
  try {
    const result = await registrationAssistant.analyzeRegistrationForm(
      props.formData, 
      'agente_viagem'
    )
    analysis.value = result
    emit('analysis-updated', result)
  } catch (error) {
    console.error('Erro na análise:', error)
  } finally {
    isAnalyzing.value = false
  }
}

const refreshAnalysis = async () => {
  await analyzeForm()
}

const getSuggestionClass = (type) => {
  const classes = {
    'error': 'bg-red-50 border border-red-200 text-red-700',
    'warning': 'bg-yellow-50 border border-yellow-200 text-yellow-700',
    'info': 'bg-blue-50 border border-blue-200 text-blue-700',
    'success': 'bg-green-50 border border-green-200 text-green-700',
    'tip': 'bg-purple-50 border border-purple-200 text-purple-700',
    'welcome': 'bg-indigo-50 border border-indigo-200 text-indigo-700'
  }
  return classes[type] || 'bg-gray-50 border border-gray-200 text-gray-700'
}

const getSuggestionIcon = (type) => {
  const icons = {
    'error': 'fas fa-exclamation-circle text-red-500',
    'warning': 'fas fa-exclamation-triangle text-yellow-500',
    'info': 'fas fa-info-circle text-blue-500',
    'success': 'fas fa-check-circle text-green-500',
    'tip': 'fas fa-lightbulb text-purple-500',
    'welcome': 'fas fa-hand-wave text-indigo-500'
  }
  return icons[type] || 'fas fa-info-circle text-gray-500'
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style> 