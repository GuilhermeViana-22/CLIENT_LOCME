<!-- src/components/layout/AppFooter.vue -->
<template>
  <footer class="bg-white border-t border-gray-200 mt-8">
    <div class="container mx-auto px-4 py-6">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="mb-4 md:mb-0">
          <h2 class="text-xl font-bold text-primary">LocMe</h2>
          <p class="text-sm text-gray-500 mt-1">Conectando pessoas</p>
          <p class="text-sm text-gray-500 mt-1">Promovendo turismo.</p>
        </div>

        <div class="flex space-x-6">
          <a href="#" class="text-gray-500 hover:text-primary transition-colors">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a href="#" class="text-gray-500 hover:text-primary transition-colors">
            <i class="fab fa-twitter"></i>
          </a>
          <a href="#" class="text-gray-500 hover:text-primary transition-colors">
            <i class="fab fa-instagram"></i>
          </a>
          <a href="#" class="text-gray-500 hover:text-primary transition-colors">
            <i class="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>

      <div class="mt-6 pt-6 border-t border-gray-100 text-center text-sm text-gray-500">
        <p>© 2025 LocMe. Todos os direitos reservados.</p>
        <div class="mt-2">
          <router-link to="/terms" class="hover:underline mx-2">Termos de Serviço</router-link>
          <router-link to="/privacy" class="hover:underline mx-2">Política de Privacidade</router-link>
          <router-link to="/contact" class="hover:underline mx-2">Contato</router-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Nenhuma lógica necessária para este componente básico
</script>