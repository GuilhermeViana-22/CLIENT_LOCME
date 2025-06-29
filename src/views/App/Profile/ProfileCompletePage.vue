<template>
  <div>

    <RepresentanteComplete v-if="authStore.user?.tipo_perfil_id === 1" />


    <!-- outros tipos s-->
  </div>
</template>

<script setup>
import {useAuthStore} from "@/stores/auth/auth.store.js";
import RepresentanteComplete from "@/components/perfis/RepresentanteComplete.vue";

const authStore = useAuthStore();
</script>