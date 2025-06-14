<template>
  <div class="bg-white rounded-lg shadow-md p-4">
    <h2 class="font-bold text-lg mb-3 text-primary">Dicas do Turismo</h2>
    <div class="space-y-3">
      <div 
        v-for="article in articles"
        :key="article.id"
        class="bg-purple-50 rounded-lg p-3"
      >
        <h3 class="font-medium text-sm mb-1">{{ article.title }}</h3>
        <p class="text-xs text-gray-600 mb-2">{{ article.preview }}</p>
        <button 
          class="text-xs text-secondary font-medium"
          @click="readArticle(article)"
        >
          Ler mais →
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  articles: {
    type: Array,
    required: true
  }
});

const readArticle = (article) => {
  console.log('Ler artigo:', article);
  // Navegar para artigo completo
};
</script>