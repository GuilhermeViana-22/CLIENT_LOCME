<template>
  <div>
    <RepresentanteComplete v-if="authStore.user?.tipo_perfil_id == 1" />

    <AgenteViagemComplete v-if="authStore.user?.tipo_perfil_id == 2" />

    <AgenciaViagemComplete v-if="authStore.user?.tipo_perfil_id == 3" />

    <GuiaTurismoComplete v-if="authStore.user?.tipo_perfil_id == 4" />

    <EmpresaComplete v-if="authStore.user?.tipo_perfil_id == 5" />
  </div>
</template>

<script setup>
import {useAuthStore} from "@/stores/auth/auth.store.js";
import RepresentanteComplete from "@/components/perfis/RepresentanteComplete.vue";
import AgenteViagemComplete from "@/components/perfis/AgenteViagemComplete.vue";
import AgenciaViagemComplete from "@/components/perfis/AgenciaViagemComplete.vue";
import GuiaTurismoComplete from "@/components/perfis/GuiaTurismoComplete.vue";
import EmpresaComplete from "@/components/perfis/EmpresaComplete.vue";

const authStore = useAuthStore();
</script>