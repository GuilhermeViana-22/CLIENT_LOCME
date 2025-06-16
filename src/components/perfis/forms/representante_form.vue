<template>
  <!-- Nome Completo -->
  <TextInput
      id="nome"
      label="Nome Completo"
      v-model="modelValue.nome"
      name="nome"
      placeholder="Seu nome completo"
      :error="storeErrors?.nome"
      :error-message="storeErrors?.nome?.[0]"
      :required="required"
      :readonly="readonly"
      :disabled="disabled"
  />

</template>

<script setup>
import TextInput from "@/components/formulario/TextInput.vue";
import { computed } from "vue";


//// TEM QUE USAR A STORE CERTA !!!!!!!!!!!
import { useRepresentateStore } from "@/stores/perfil/representante.store.js";

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
    default: () => ({

      /// VALORES DEFAULTS
      nome: '',

    })
  },
  readonly: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  }
});

const store = useRepresentateStore();

// Computed para os erros da store
const storeErrors = computed(() => store.errors);
</script>