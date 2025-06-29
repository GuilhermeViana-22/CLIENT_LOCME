<template>
  <div>
    <label :for="id" class="block text-sm font-medium text-gray-700">
      {{ label }} <span v-if="required" class="text-red-500">*</span>
    </label>
    <div class="mt-1 relative rounded-md shadow-sm">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <i class="fas fa-building text-gray-400"></i>
      </div>
      <input
        :id="id"
        ref="inputRef"
        :name="name"
        type="text"
        :value="formattedValue"
        @input="handleInput"
        @blur="handleBlur"
        :placeholder="placeholder"
        :required="required"
        :readonly="readonly"
        :disabled="disabled"
        :autocomplete="autocomplete"
        class="py-2 pl-10 pr-10 block w-full border rounded-md focus:ring-2 focus:ring-offset-0 transition-colors"
        :class="inputClasses"
      />
      <!-- Ícone de validação -->
      <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
        <i 
          v-if="showValidationIcon"
          :class="validationIconClass"
        ></i>
      </div>
    </div>
    
    <!-- Mensagem de erro -->
    <div v-if="error && errorMessage" class="text-red-600 text-sm mt-1.5">
      {{ errorMessage }}
    </div>
    
    <!-- Indicador de CNPJ válido -->
    <div v-if="isValid && formattedValue" class="text-green-600 text-sm mt-1.5 flex items-center">
      <i class="fas fa-check-circle mr-1"></i>
      CNPJ válido
    </div>
    
    <!-- Indicador de CNPJ inválido (apenas se preenchido) -->
    <div v-if="!isValid && formattedValue && formattedValue.length === 18" class="text-red-600 text-sm mt-1.5 flex items-center">
      <i class="fas fa-times-circle mr-1"></i>
      CNPJ inválido
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  modelValue: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: '00.000.000/0000-00'
  },
  required: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  error: {
    type: Boolean,
    default: false
  },
  errorMessage: {
    type: String,
    default: ''
  },
  autocomplete: {
    type: String,
    default: 'off'
  }
})

const emit = defineEmits(['update:modelValue', 'blur', 'focus', 'validation'])

const inputRef = ref(null)

// Função para aplicar máscara de CNPJ
const applyMask = (value) => {
  const cnpj = value.replace(/\D/g, '')
  
  if (cnpj.length <= 14) {
    return cnpj
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
  }
  
  return cnpj.substring(0, 14)
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
}

// Função para validar CNPJ
const validateCNPJ = (cnpj) => {
  const cleanCNPJ = cnpj.replace(/\D/g, '')
  
  if (cleanCNPJ.length !== 14) return false
  
  // Elimina CNPJs inválidos conhecidos
  if (/^(\d)\1{13}$/.test(cleanCNPJ)) return false
  
  // Valida DVs
  let tamanho = cleanCNPJ.length - 2
  let numeros = cleanCNPJ.substring(0, tamanho)
  let digitos = cleanCNPJ.substring(tamanho)
  let soma = 0
  let pos = tamanho - 7
  
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--
    if (pos < 2) pos = 9
  }
  
  let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
  if (resultado !== parseInt(digitos.charAt(0))) return false
  
  tamanho = tamanho + 1
  numeros = cleanCNPJ.substring(0, tamanho)
  soma = 0
  pos = tamanho - 7
  
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--
    if (pos < 2) pos = 9
  }
  
  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
  return resultado === parseInt(digitos.charAt(1))
}

// Computed properties
const formattedValue = computed(() => {
  return applyMask(props.modelValue || '')
})

const isValid = computed(() => {
  if (!props.modelValue) return false
  return validateCNPJ(props.modelValue)
})

const showValidationIcon = computed(() => {
  return formattedValue.value.length > 0 && !props.disabled && !props.readonly
})

const validationIconClass = computed(() => {
  if (isValid.value) {
    return 'fas fa-check-circle text-green-500'
  } else if (formattedValue.value.length === 18) {
    return 'fas fa-times-circle text-red-500'
  }
  return ''
})

const inputClasses = computed(() => {
  let classes = []
  
  if (props.error || (!isValid.value && formattedValue.value.length === 18)) {
    classes.push('border-red-400 focus:ring-red-500 focus:border-red-500')
  } else if (isValid.value) {
    classes.push('border-green-400 focus:ring-green-500 focus:border-green-500')
  } else {
    classes.push('border-gray-300 focus:ring-blue-500 focus:border-blue-500')
  }
  
  if (props.disabled) {
    classes.push('bg-gray-100 cursor-not-allowed')
  } else if (props.readonly) {
    classes.push('bg-gray-50')
  }
  
  return classes.join(' ')
})

// Event handlers
const handleInput = (event) => {
  const rawValue = event.target.value.replace(/\D/g, '')
  emit('update:modelValue', rawValue)
  
  // Emite evento de validação
  emit('validation', {
    isValid: validateCNPJ(rawValue),
    value: rawValue,
    formatted: applyMask(rawValue)
  })
}

const handleBlur = (event) => {
  emit('blur', event)
}

// Watch para mudanças externas no modelValue
watch(() => props.modelValue, (newValue) => {
  if (inputRef.value && inputRef.value.value !== applyMask(newValue || '')) {
    inputRef.value.value = applyMask(newValue || '')
  }
})
</script>

<style scoped>
/* Animações para as validações */
.text-green-600, .text-red-600 {
  transition: all 0.2s ease-in-out;
}

/* Foco no input */
input:focus {
  outline: none;
}

/* Estados de hover */
input:hover:not(:disabled):not(:readonly) {
  border-color: #9ca3af;
}
</style> 