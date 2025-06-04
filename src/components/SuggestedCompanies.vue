<template>
  <div class="bg-white rounded-lg shadow-md p-4">
    <h2 class="font-bold text-lg mb-3 text-primary">Sugestões para você</h2>
    <div class="flex space-x-3 overflow-x-auto pb-2">
      <div 
        v-for="company in companies"
        :key="company.id"
        class="min-w-[120px] bg-purple-50 rounded-lg p-3 flex flex-col items-center"
      >
        <div class="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mb-2">
          <i :class="`fas fa-${company.icon} text-white`"></i>
        </div>
        <h3 class="font-medium text-xs text-center">{{ company.name }}</h3>
        <p class="text-xs text-gray-500 text-center mb-2">{{ company.type }}</p>
        <button 
          class="text-xs bg-primary text-white px-2 py-1 rounded-full"
          @click="viewCompany(company)"
        >
          Ver
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  companies: {
    type: Array,
    required: true
  }
});

const viewCompany = (company) => {
  console.log('Visualizar empresa:', company);
  // Navegar para perfil da empresa
};
</script>