<template>
  <div class="bg-white rounded-2xl shadow-lg p-6">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-bold text-primary">Sugestões para você</h2>
      <button class="text-sm text-purple-600 hover:text-purple-800 font-medium">Ver todas</button>
    </div>
    
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      <div 
        v-for="company in companies"
        :key="company.id"
        class="bg-gradient-to-br from-purple-50 to-white rounded-xl p-4 flex flex-col items-center transition-all duration-300 hover:shadow-md hover:-translate-y-1 border border-purple-100"
      >
        <div class="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-purple-400 flex items-center justify-center mb-3 shadow-md">
          <i :class="`fas fa-${company.icon} text-white text-lg`"></i>
        </div>
        <h3 class="font-semibold text-sm text-gray-800 text-center">{{ company.name }}</h3>
        <p class="text-xs text-gray-500 text-center mb-3">{{ company.type }}</p>
        <button 
          class="text-xs bg-purple-600 hover:bg-purple-700 text-white px-4 py-1.5 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2"
          @click="viewCompany(company)"
        >
          Ver perfil
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