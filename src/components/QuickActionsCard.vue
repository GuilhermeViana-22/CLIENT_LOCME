<template>
  <div class="bg-white rounded-lg shadow-md p-4">
    <div class="grid grid-cols-2 gap-3">
      <button 
        v-for="action in quickActions"
        :key="action.id"
        class="flex flex-col items-center justify-center p-2 rounded-lg bg-purple-50 text-primary"
        @click="handleAction(action)"
      >
        <i :class="`fas fa-${action.icon} mb-1`"></i>
        <span class="text-xs">{{ action.label }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
const quickActions = [
  { id: 1, icon: 'search', label: 'Buscar', action: 'search' },
  { id: 2, icon: 'users', label: 'Conexões', action: 'connections' },
  { id: 3, icon: 'edit', label: 'Sugerir', action: 'suggest' },
  { id: 4, icon: 'crown', label: 'Planos', action: 'plans' }
];

const handleAction = (action) => {
  console.log('Ação rápida:', action.action);
  // Aqui você pode adicionar navegação ou outras ações
};
</script>