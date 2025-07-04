<template>
  <!-- Nome Completo -->
  <TextInput
      id="nome_completo"
      label="Nome Completo"
      v-model="modelValue.nome_completo"
      name="nome_completo"
      placeholder="Seu nome completo"
      :error="storeErrors?.nome_completo"
      :error-message="storeErrors?.nome_completo?.[0]"
      :required="required"
      :readonly="readonly"
      :disabled="disabled"
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
  />

  <!-- WhatsApp -->
  <TextInput
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
  />

  <!-- Cidade -->
  <TextInput
      id="cidade"
      label="Cidade"
      v-model="modelValue.cidade"
      name="cidade"
      placeholder="Sua cidade"
      :error="storeErrors?.cidade"
      :error-message="storeErrors?.cidade?.[0]"
      :required="required"
      :readonly="readonly"
      :disabled="disabled"
  />

  <!-- UF -->
  <TextInput
      id="uf"
      label="Estado (UF)"
      v-model="modelValue.uf"
      name="uf"
      placeholder="SP"
      maxlength="2"
      :error="storeErrors?.uf"
      :error-message="storeErrors?.uf?.[0]"
      :required="required"
      :readonly="readonly"
      :disabled="disabled"
  />

  <!-- Portfolio Redes Sociais -->
  <TextInput
      id="portfolio_redes_sociais"
      label="Portfolio / Redes Sociais"
      v-model="modelValue.portfolio_redes_sociais"
      name="portfolio_redes_sociais"
      placeholder="Links das suas redes sociais ou portfolio"
      :error="storeErrors?.portfolio_redes_sociais"
      :error-message="storeErrors?.portfolio_redes_sociais?.[0]"
      :required="required"
      :readonly="readonly"
      :disabled="disabled"
  />

  <!-- Vinculado à Agência -->
  <div class="flex items-center">
    <input
        id="vinculado_agencia"
        type="checkbox"
        v-model="modelValue.vinculado_agencia"
        :disabled="disabled || readonly"
        class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
    />
    <label for="vinculado_agencia" class="ml-2 block text-sm text-gray-700">
      Vinculado à uma agência
    </label>
  </div>

  <!-- CNPJ Agência Vinculada (aparece apenas se vinculado_agencia for true) -->
  <TextInput
      v-if="modelValue.vinculado_agencia"
      id="cnpj_agencia_vinculada"
      label="CNPJ da Agência Vinculada"
      v-model="modelValue.cnpj_agencia_vinculada"
      name="cnpj_agencia_vinculada"
      placeholder="00.000.000/0000-00"
      :error="storeErrors?.cnpj_agencia_vinculada"
      :error-message="storeErrors?.cnpj_agencia_vinculada?.[0]"
      :required="modelValue.vinculado_agencia && required"
      :readonly="readonly"
      :disabled="disabled"
  />

  <!-- Tem CNPJ Próprio -->
  <div class="flex items-center">
    <input
        id="tem_cnpj_proprio"
        type="checkbox"
        v-model="modelValue.tem_cnpj_proprio"
        :disabled="disabled || readonly"
        class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
    />
    <label for="tem_cnpj_proprio" class="ml-2 block text-sm text-gray-700">
      Tenho CNPJ próprio
    </label>
  </div>

  <!-- Aceita Contato de Representantes -->
  <div class="flex items-center">
    <input
        id="aceita_contato_representantes"
        type="checkbox"
        v-model="modelValue.aceita_contato_representantes"
        :disabled="disabled || readonly"
        class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
    />
    <label for="aceita_contato_representantes" class="ml-2 block text-sm text-gray-700">
      Aceito contato de representantes
    </label>
  </div>
</template>

<script setup>
import TextInput from "@/components/formulario/TextInput.vue";
import CpfInput from "@/components/formulario/CpfInput.vue";
import { computed } from "vue";

import { useAgenteViagemStore } from "@/stores/perfil/agenteViagem.store.js";

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
    default: () => ({
      nome_completo: '',
      cpf: '',
      whatsapp: '',
      cidade: '',
      uf: '',
      portfolio_redes_sociais: '',
      vinculado_agencia: false,
      cnpj_agencia_vinculada: '',
      tem_cnpj_proprio: false,
      aceita_contato_representantes: false
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

const store = useAgenteViagemStore();

// Computed para os erros da store
const storeErrors = computed(() => store.errors);
</script> 