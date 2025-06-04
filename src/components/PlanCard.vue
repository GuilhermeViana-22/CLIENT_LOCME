<template>
  <div class="bg-gradient-to-r from-primary to-purple-800 text-white rounded-lg shadow-md p-4">
    <h2 class="font-bold text-lg mb-2">Seu Plano Atual</h2>
    <div class="flex justify-between items-center mb-2">
      <span class="bg-accent px-2 py-1 rounded-full text-xs">{{ userPlan.type }}</span>
      <button 
        class="bg-secondary text-white text-xs px-3 py-1 rounded-full"
        @click="handlePlanAction"
      >
        {{ userPlan.type === 'RO' ? 'Upgrade' : 'Gerenciar' }}
      </button>
    </div>
    <div class="w-full bg-white bg-opacity-20 rounded-full h-2 mb-2">
      <div 
        class="bg-accent h-2 rounded-full" 
        :style="`width: ${userPlan.progress}%`"
      ></div>
    </div>
    <p class="text-xs">{{ userPlan.message }}</p>
  </div>
</template>

<script setup>
defineProps({
  userPlan: {
    type: Object,
    required: true
  }
});

const handlePlanAction = () => {
  // Lógica para upgrade/gerenciamento
  console.log('Ação do plano acionada');
};
</script>