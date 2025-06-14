<template>
  <div class="bg-white md:bg-transparent rounded-lg shadow-md md:shadow-none p-4">
    <div class="flex items-center border border-gray-300 rounded-full px-4 py-2 bg-white">
      <i class="fas fa-search text-gray-500 mr-2"></i>
      <input 
        type="text" 
        placeholder="Buscar profissionais/empresas..." 
        class="w-full outline-none text-gray-700"
        v-model="searchQuery"
        @keyup.enter="performSearch"
      >
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const searchQuery = ref('');

const performSearch = () => {
  // Lógica de busca aqui
  console.log('Buscando por:', searchQuery.value);
};
</script>