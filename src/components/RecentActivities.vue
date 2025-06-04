<template>
  <div class="bg-white rounded-lg shadow-md p-4">
    <h2 class="font-bold text-lg mb-3 text-primary">Atividades</h2>
    <ul class="space-y-2">
      <li 
        v-for="activity in activities"
        :key="activity.id"
        class="flex items-start"
      >
        <div class="bg-secondary text-white p-1 rounded-full mr-2 mt-1" v-if="activity.type === 'search'">
          <i class="fas fa-search text-xs"></i>
        </div>
        <div class="bg-accent text-white p-1 rounded-full mr-2 mt-1" v-else>
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