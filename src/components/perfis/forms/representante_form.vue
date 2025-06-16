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
  />

</template>

<script setup>
import TextInput from "@/components/formulario/TextInput.vue";
import { computed } from "vue";
import { useRepresentateStore } from "@/stores/perfil/representante.store.js";
import { useAuthStore } from "@/stores/auth/auth.store.js";

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
    default: () => ({
      nome: '',

    })
  },
  readonly: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue']);

const store = useRepresentateStore();
const authStore = useAuthStore();

// Computed para os erros da store
const storeErrors = computed(() => store.errors);

// Inicializa valores padrão do authStore se disponíveis
if (authStore.user?.name && !props.modelValue.apelido) {
  emit('update:modelValue', {
    ...props.modelValue,
    apelido: authStore.user.name,
    email: authStore.user.email
  });
}
</script>