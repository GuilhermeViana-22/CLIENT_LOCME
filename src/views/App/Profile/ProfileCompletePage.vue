<template>
  <div>

    <RepresentanteForm v-if="authStore.user?.tipo_perfil_id === 1" />


    <!-- outros tipos -->
  </div>
</template>

<script setup>
import {useAuthStore} from "@/stores/auth/auth.store.js";
import RepresentanteForm from "@/components/perfis/RepresentanteForm.vue";

const authStore = useAuthStore();
</script>