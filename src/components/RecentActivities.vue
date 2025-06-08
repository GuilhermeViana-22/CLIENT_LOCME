<template>
  <div class="bg-white rounded-lg shadow-md p-4">
    <h2 class="font-bold text-lg mb-3 text-primary">Atividades</h2>
    <ul class="space-y-2 md:flex md:space-x-8 md:overflow-x-auto overflow-y-auto max-h-full md:max-w-full md:text-nowrap">
      <li 
        v-for="activity in activities"
        :key="activity.id"
        class="flex items-center md:py-10 py-2"
      >
        <div class="bg-secondary text-white p-2 rounded-full mr-2 mt-1 w-12 h-12 flex justify-center items-center" v-if="activity.type == 1">
          <i class="fas fa-search text-xs"></i>
        </div>
        <div class="bg-accent text-white p-2 rounded-full mr-2 mt-1 w-12 h-12 flex justify-center items-center" v-else>
          <i class="fas fa-eye text-xs"></i>
        </div>
        <span class="text-sm">{{ activity.text }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  activities: {
    type: Array,
    required: true
  }
});
</script>