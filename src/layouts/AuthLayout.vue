<template>
  <!-- Layout base para autenticação -->
  <div class="auth-layout">
    <router-view /> <!-- Isso renderizará Login, Register ou Forgot -->
  </div>
</template>

<script setup>
// Não importe Login aqui - o router cuidará disso
</script>