<template>
  <div class="bg-white rounded-xl shadow-lg p-6 ">
    <h2 class="text-xl font-semibold text-primary mb-6">Ações Rápidas</h2>
    <div class="grid grid-cols-4 gap-4">
      <button 
        v-for="action in quickActions"
        :key="action.id"
        class="flex flex-col items-center cursor-pointer justify-center p-4 rounded-xl transition-all duration-300 hover:shadow-md hover:bg-purple-50 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-200"
        @click="handleAction(action)"
      >
        <div class="w-12 h-12 flex items-center justify-center bg-purple-100 rounded-full mb-3 text-purple-600">
          <i :class="`fas fa-${action.icon} text-lg`"></i>
        </div>
        <span class="text-sm font-medium text-gray-700">{{ action.label }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
const quickActions = [
  { id: 1, icon: 'search', label: 'Buscar', action: 'search' },
  { id: 2, icon: 'users', label: 'Conexões', action: 'connections' },
  { id: 3, icon: 'file', label: 'Importar', action: 'suggest' },
  { id: 4, icon: 'crown', label: 'Planos', action: 'plans' }
];

const handleAction = (action) => {
  console.log('Ação rápida:', action.action);
  // Aqui você pode adicionar navegação ou outras ações
};
</script>