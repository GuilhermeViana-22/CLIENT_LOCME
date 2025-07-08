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
          <i class="fas fa-phone text-gray-400"></i>
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
            maxlength="15"
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

      <!-- Indicador de telefone válido -->
      <div v-if="isValid && formattedValue" class="text-green-600 text-sm mt-1.5 flex items-center">
        <i class="fas fa-check-circle mr-1"></i>
        Telefone válido
      </div>

      <!-- Indicador de telefone inválido (apenas se preenchido) -->
      <div v-if="!isValid && formattedValue && formattedValue.length >= 14" class="text-red-600 text-sm mt-1.5 flex items-center">
        <i class="fas fa-times-circle mr-1"></i>
        Telefone inválido
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
    default: '(00) 00000-0000'
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
    default: 'tel'
  },
  viewMode: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'blur', 'focus', 'validation'])

const inputRef = ref(null)

// Função para aplicar máscara de telefone
const applyMask = (value) => {
  if (!value) return ''

  const phone = value.replace(/\D/g, '')

  if (phone.length <= 10) {
    // Formato para telefone fixo (10 dígitos)
    return phone
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d)/, '$1-$2')
  } else {
    // Formato para celular (11 dígitos)
    return phone
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
  }
}

// Função para validar telefone
const validatePhone = (phone) => {
  const cleanPhone = phone.replace(/\D/g, '')

  // Telefone fixo (10 dígitos) ou celular (11 dígitos)
  if (cleanPhone.length === 10 || cleanPhone.length === 11) {
    // Verifica se todos os dígitos não são iguais
    if (/^(\d)\1+$/.test(cleanPhone)) return false

    // Valida DDD (códigos de área brasileiros vão de 11 a 99)
    const ddd = cleanPhone.substring(0, 2)
    if (ddd < '11' || ddd > '99') return false

    return true
  }

  return false
}

// Computed properties
const formattedValue = computed(() => {
  return applyMask(props.modelValue || '')
})

const isValid = computed(() => {
  if (!props.modelValue) return false
  return validatePhone(props.modelValue)
})

const showValidationIcon = computed(() => {
  return formattedValue.value.length > 0 && !props.disabled && !props.readonly
})

const validationIconClass = computed(() => {
  if (isValid.value) {
    return 'fas fa-check-circle text-green-500'
  } else if (formattedValue.value.length >= 14) {
    return 'fas fa-times-circle text-red-500'
  }
  return ''
})

const inputClasses = computed(() => {
  let classes = []

  if (props.error || (!isValid.value && formattedValue.value.length >= 14)) {
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
    isValid: validatePhone(rawValue),
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