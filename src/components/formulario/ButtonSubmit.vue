<template>
  <button
      type="submit"
      :disabled="loading"
      class="w-full cursor-pointer py-3.5 px-4  text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.01] shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-md mt-2"
      :class="customClass"
  >
    <span v-if="!loading">{{ label }}</span>
    <span v-else class="flex items-center justify-center">
      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      {{ loadingText }}
    </span>
  </button>
</template>

<script setup>
defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: 'Salvar'
  },
  loadingText: {
    type: String,
    default: 'Processando...'
  },
  customClass: {
    type: String,
    default: 'bg-primary'
  }
});
</script>