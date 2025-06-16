<template>
  <div
      class="relative flex items-center"
      :class="spacing"
  >
    <hr
        v-if="variant !== 'text-center'"
        :class="lineClasses"
        :style="computedStyles"
        aria-hidden="true"
    />

    <!-- Versão com texto no centro -->
    <template v-if="variant === 'text-center'">
      <hr
          class="flex-1 border-t"
          :class="color"
          :style="computedStyles"
          aria-hidden="true"
      />
      <span
          class="px-3 text-sm font-medium"
          :class="textColor"
      >
        <slot name="text">{{ text }}</slot>
      </span>
      <hr
          class="flex-1 border-t"
          :class="color"
          :style="computedStyles"
          aria-hidden="true"
      />
    </template>
  </div>
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
    validator: (value) => ['default', 'dashed', 'dotted', 'gradient', 'text', 'text-center'].includes(value)
  },
  // Cor da linha
  color: {
    type: String,
    default: 'border-gray-200'
  },
  // Cor do texto (apenas para variant="text-center")
  textColor: {
    type: String,
    default: 'text-gray-500'
  },
  // Texto (apenas para variant="text-center")
  text: {
    type: String,
    default: ''
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

const lineClasses = computed(() => {
  const variants = {
    default: `${props.thickness} ${props.color}`,
    dashed: `${props.thickness} ${props.color} border-dashed`,
    dotted: `${props.thickness} ${props.color} border-dotted`,
    gradient: 'border-none h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent w-full',
    text: 'border-none relative text-center before:content-[""] before:absolute before:top-1/2 before:left-0 before:right-0 before:h-px before:bg-current w-full'
  }

  return [
    variants[props.variant],
    props.class
  ].filter(Boolean).join(' ')
})

const computedStyles = computed(() => {
  if (typeof props.style === 'string') return props.style
  return props.style
})
</script>