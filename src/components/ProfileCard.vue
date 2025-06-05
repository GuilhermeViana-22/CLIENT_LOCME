<template>
  <div class="bg-white rounded-lg shadow-md md:p-12 p-4 md:flex">
    <div class="flex items-center space-x-3 md:w-2/3">
      <div class="w-12 h-12 md:h-full md:w-24 md:rounded-lg rounded-full bg-accent flex items-center justify-center">
        <i class="fas fa-user text-white text-xl"></i>
      </div>
      <div>
        <h3 class="font-bold">{{ user.name }}</h3>
        <p class="text-sm text-gray-600">{{ user.role }}</p>
        <p class="text-xs text-gray-500" v-if="user.company">{{ user.company }}</p>
      </div>
    </div>
    <button 
      class="mt-3 md:w-1/3 w-full md:rounded-lg border border-primary text-primary rounded-full py-1 text-sm font-medium hover:bg-accent hover:text-white hover:border-white transition-colors"
      @click="editProfile"
    >
      Editar perfil
    </button>
  </div>
</template>

<script setup>
defineProps({
  user: {
    type: Object,
    required: true
  }
});

const editProfile = () => {
  // Navegar para edição de perfil
  console.log('Editar perfil');
};
</script>