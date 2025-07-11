<template>
  <!-- Apelido/Nome Profissional -->
  <TextInput
      id="apelido"
      label="Apelido/Nome Profissional"
      v-model="modelValue.apelido"
      name="apelido"
      type="text"
      placeholder="Como você é conhecido pelos turistas"
      :error="storeErrors?.apelido"
      :error-message="storeErrors?.apelido?.[0]"
      :required="required"
      :readonly="readonly"
      :disabled="disabled"
      :viewMode="viewMode || false"
  />

  <!-- CPF -->
  <CpfInput
      id="cpf"
      label="CPF"
      v-model="modelValue.cpf"
      name="cpf"
      placeholder="000.000.000-00"
      :error="storeErrors?.cpf"
      :error-message="storeErrors?.cpf?.[0]"
      :required="required"
      :readonly="readonly"
      :disabled="disabled"
      :viewMode="viewMode || false"
  />

  <!-- Whatsapp -->
  <TelefoneInput
      id="whatsapp"
      label="WhatsApp"
      v-model="modelValue.whatsapp"
      name="whatsapp"
      placeholder="(00) 00000-0000"
      :error="storeErrors?.whatsapp"
      :error-message="storeErrors?.whatsapp?.[0]"
      :required="required"
      :readonly="readonly"
      :disabled="disabled"
      :viewMode="viewMode || false"
  />

  <!-- Email de Contato -->
  <TextInput
      id="email_contato"
      label="Email de Contato"
      v-model="modelValue.email_contato"
      name="email_contato"
      type="email"
      placeholder="seu@email.com"
      :error="storeErrors?.email_contato"
      :error-message="storeErrors?.email_contato?.[0]"
      :required="required"
      :readonly="readonly"
      :disabled="disabled"
      :viewMode="viewMode || false"
  />

  <!-- Data de Nascimento -->
  <TextInput
      id="data_nascimento"
      label="Data de Nascimento"
      v-model="modelValue.data_nascimento"
      name="data_nascimento"
      type="date"
      :error="storeErrors?.data_nascimento"
      :error-message="storeErrors?.data_nascimento?.[0]"
      :required="required"
      :readonly="readonly"
      :disabled="disabled"
      :viewMode="viewMode || false"
  />

  <!-- CADASTUR -->
  <TextInput
      id="cadastur"
      label="CADASTUR (Registro de Guia)"
      v-model="modelValue.cadastur"
      name="cadastur"
      type="text"
      placeholder="Número do seu registro CADASTUR"
      :error="storeErrors?.cadastur"
      :error-message="storeErrors?.cadastur?.[0]"
      :required="false"
      :readonly="readonly"
      :disabled="disabled"
      :viewMode="viewMode || false"
  />

  <!-- Abrangência de Atuação -->
  <SelectInput
      :modelValue="modelValue.abrangencia_id"
      @update:modelValue="modelValue.abrangencia_id = $event"
      id="abrangencia_id"
      name="abrangencia_id"
      label="Abrangência de Atuação"
      placeholder="Selecione sua área de atuação"
      :required="required"
      :disabled="disabled"
      :readonly="readonly"
      :error="storeErrors?.abrangencia_id"
      :error-message="storeErrors?.abrangencia_id?.[0]"
      :viewMode="viewMode || false"
  >
    <option value="1">Local (Cidade específica)</option>
    <option value="2">Regional (Estado/Região)</option>
    <option value="3">Nacional (Todo o Brasil)</option>
    <option value="4">Internacional (Outros países)</option>
    <option value="5">Especializado em Ecoturismo</option>
    <option value="6">Especializado em Turismo Cultural</option>
    <option value="7">Especializado em Turismo de Aventura</option>
    <option value="8">Especializado em Turismo Religioso</option>
    <option value="9">Especializado em Turismo Gastronômico</option>
    <option value="10">Especializado em Turismo Rural</option>
    <option value="11">Guia de Cidade</option>
    <option value="12">Guia de Museus e Monumentos</option>
    <option value="13">Guia de Natureza</option>
    <option value="14">Guia Especializado em Grupos</option>
    <option value="15">Guia Bilíngue/Multilíngue</option>
  </SelectInput>
</template>

<script setup>
import TextInput from "@/components/formulario/TextInput.vue";
import { computed } from "vue";
import { useGuiaTurismoStore } from "@/stores/perfil/guiaTurismo.store.js";
import TelefoneInput from "@/components/formulario/TelefoneInput.vue";
import SelectInput from "@/components/formulario/SelectInput.vue";
import CpfInput from "@/components/formulario/CpfInput.vue";

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
    default: () => ({
      apelido: '',
      cpf: '',
      whatsapp: '',
      email_contato: '',
      data_nascimento: '',
      cadastur: '',
      abrangencia_id: ''
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
  },
  viewMode: {
    type: Boolean,
    default: false
  }
});

const store = useGuiaTurismoStore();

// Computed para os erros da store
const storeErrors = computed(() => store.errors);
</script>