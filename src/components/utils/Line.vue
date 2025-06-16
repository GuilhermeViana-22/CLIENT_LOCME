<template>
  <hr
      :class="computedClasses"
      :style="computedStyles"
      aria-hidden="true"
  />
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  // Classes de estilo
  class: {
    type: String,
    default: ''
  },
  // Estilos inline
  style: {
    type: [String, Object],
    default: ''
  },
  // Tipo de linha
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'dashed', 'dotted', 'gradient', 'text'].includes(value)
  },
  // Cor da linha
  color: {
    type: String,
    default: 'border-gray-200'
  },
  // Espessura
  thickness: {
    type: String,
    default: 'border-t'
  },
  // Margem vertical
  spacing: {
    type: String,
    default: 'my-4'
  }
})

const computedClasses = computed(() => {
  const variants = {
    default: `${props.thickness} ${props.color}`,
    dashed: 'border-dashed',
    dotted: 'border-dotted',
    gradient: 'border-none h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent',
    text: 'border-none relative text-center before:content-[""] before:absolute before:top-1/2 before:left-0 before:right-0 before:h-px before:bg-current'
  }

  return [
    props.thickness,
    props.variant !== 'gradient' && props.variant !== 'text' ? props.color : '',
    variants[props.variant],
    props.spacing,
    props.class
  ].filter(Boolean).join(' ')
})

const computedStyles = computed(() => {
  if (typeof props.style === 'string') return props.style
  return props.style
})
</script>