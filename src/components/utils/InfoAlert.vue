<template>
  <div
      class="info-alert w-full rounded-lg p-4 flex items-start"
      :class="alertClasses"
  >
    <div class="flex-shrink-0 mr-3">
      <i :class="iconClasses"></i>
    </div>
    <div class="flex-1">
      <slot></slot>
    </div>
    <button
        v-if="dismissible"
        @click="$emit('dismiss')"
        class="flex-shrink-0 ml-2 text-xl opacity-70 hover:opacity-100 focus:outline-none"
    >
      &times;
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'info',
    validator: (value) => ['info', 'success', 'danger', 'warning', 'primary', 'secondary'].includes(value)
  },
  icon: {
    type: String,
    default: ''
  },
  dismissible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['dismiss'])

// Classes computadas
const alertClasses = computed(() => {
  const base = 'border'
  const types = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    danger: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    primary: 'bg-indigo-50 border-indigo-200 text-indigo-800',
    secondary: 'bg-gray-50 border-gray-200 text-gray-800'
  }
  return `${base} ${types[props.type]}`
})

const iconClasses = computed(() => {
  const defaultIcons = {
    info: 'fas fa-info-circle',
    success: 'fas fa-check-circle',
    danger: 'fas fa-exclamation-circle',
    warning: 'fas fa-exclamation-triangle',
    primary: 'fas fa-bell',
    secondary: 'fas fa-info'
  }

  return props.icon || defaultIcons[props.type]
})
</script>

<style scoped>
.info-alert {
  transition: all 0.3s ease;
}

.info-alert i {
  font-size: 1.25rem;
  line-height: 1;
}
</style>