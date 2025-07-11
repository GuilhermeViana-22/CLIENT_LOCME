<template>
  <div>
    <div v-if="viewMode" class="view-mode">
      <p class="text-sm text-gray-700">{{ label }}</p>
      <p class="font-medium">{{ formattedValue || 'Não informado' }}</p>
    </div>

    <template v-else>
      <label :for="id" class="block text-sm font-medium text-gray-700">
        {{ label }} <span v-if="required" class="text-red-500">*</span>
      </label>
      <div class="mt-1 relative rounded-md shadow-sm">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <i class="fas fa-user text-gray-400"></i>
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

      <!-- Indicador de CPF válido -->
      <div v-if="isValid && formattedValue" class="text-green-600 text-sm mt-1.5 flex items-center">
        <i class="fas fa-check-circle mr-1"></i>
        CPF válido
      </div>

      <!-- Indicador de CPF inválido (apenas se preenchido) -->
      <div v-if="!isValid && formattedValue && formattedValue.length === 14" class="text-red-600 text-sm mt-1.5 flex items-center">
        <i class="fas fa-times-circle mr-1"></i>
        CPF inválido
      </div>
    </template>
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
    default: '000.000.000-00'
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
  },
  viewMode: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'blur', 'focus', 'validation'])

const inputRef = ref(null)

// Função para aplicar máscara de CPF
const applyMask = (value) => {
  if (!value) return ''

  const cpf = value.replace(/\D/g, '')

  if (cpf.length <= 11) {
    return cpf
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
  }

  return cpf.substring(0, 11)
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
}

// Função para validar CPF
const validateCPF = (cpf) => {
  const cleanCPF = cpf.replace(/\D/g, '')

  if (cleanCPF.length !== 11) return false

  // Elimina CPFs inválidos conhecidos
  if (/^(\d)\1{10}$/.test(cleanCPF)) return false

  // Valida primeiro dígito verificador
  let soma = 0
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cleanCPF.charAt(i)) * (10 - i)
  }
  let resto = 11 - (soma % 11)
  if (resto === 10 || resto === 11) resto = 0
  if (resto !== parseInt(cleanCPF.charAt(9))) return false

  // Valida segundo dígito verificador
  soma = 0
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cleanCPF.charAt(i)) * (11 - i)
  }
  resto = 11 - (soma % 11)
  if (resto === 10 || resto === 11) resto = 0
  if (resto !== parseInt(cleanCPF.charAt(10))) return false

  return true
}

// Computed properties
const formattedValue = computed(() => {
  return applyMask(props.modelValue || '')
})

const isValid = computed(() => {
  if (!props.modelValue) return false
  return validateCPF(props.modelValue)
})

const showValidationIcon = computed(() => {
  return formattedValue.value.length > 0 && !props.disabled && !props.readonly
})

const validationIconClass = computed(() => {
  if (isValid.value) {
    return 'fas fa-check-circle text-green-500'
  } else if (formattedValue.value.length === 14) {
    return 'fas fa-times-circle text-red-500'
  }
  return ''
})

const inputClasses = computed(() => {
  let classes = []

  if (props.error || (!isValid.value && formattedValue.value.length === 14)) {
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
    isValid: validateCPF(rawValue),
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