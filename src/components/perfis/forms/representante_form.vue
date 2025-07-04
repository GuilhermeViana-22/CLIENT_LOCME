<template>
  <!-- WhatsApp -->
  <TextInput
      id="whatsapp"
      label="WhatsApp"
      v-model="modelValue.whatsapp"
      name="whatsapp"
      placeholder="(00) 00000-0000"
      mask="(##) #####-####"
      :error="storeErrors?.whatsapp"
      :error-message="storeErrors?.whatsapp?.[0]"
      :required="required"
      :readonly="readonly"
      :disabled="disabled"
  />

  <!-- Email de Contato -->
  <TextInput
      id="email_contato"
      label="Email de Contato"
      v-model="modelValue.email_contato"
      name="email_contato"
      type="email"
      placeholder="seu.email@exemplo.com"
      :error="storeErrors?.email_contato"
      :error-message="storeErrors?.email_contato?.[0]"
      :required="required"
      :readonly="readonly"
      :disabled="disabled"
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
  />

  <!-- Operadora ID -->
  <TextInput
      id="operadora_id"
      label="ID da Operadora"
      v-model="modelValue.operadora_id"
      name="operadora_id"
      type="number"
      placeholder="ID da operadora"
      :error="storeErrors?.operadora_id"
      :error-message="storeErrors?.operadora_id?.[0]"
      :required="required"
      :readonly="readonly"
      :disabled="disabled"
  />

  <!-- Empresa ID -->
  <TextInput
      id="empresa_id"
      label="ID da Empresa"
      v-model="modelValue.empresa_id"
      name="empresa_id"
      type="number"
      placeholder="ID da empresa (opcional)"
      :error="storeErrors?.empresa_id"
      :error-message="storeErrors?.empresa_id?.[0]"
      :required="false"
      :readonly="readonly"
      :disabled="disabled"
  />

  <!-- Empresa Outra -->
  <TextInput
      id="empresa_outra"
      label="Outra Empresa"
      v-model="modelValue.empresa_outra"
      name="empresa_outra"
      placeholder="Nome de outra empresa (opcional)"
      :error="storeErrors?.empresa_outra"
      :error-message="storeErrors?.empresa_outra?.[0]"
      :required="false"
      :readonly="readonly"
      :disabled="disabled"
  />

  <!-- Telefone de Vendas -->
  <TextInput
      id="telefone_vendas"
      label="Telefone de Vendas"
      v-model="modelValue.telefone_vendas"
      name="telefone_vendas"
      placeholder="(00) 0000-0000"
      :error="storeErrors?.telefone_vendas"
      :error-message="storeErrors?.telefone_vendas?.[0]"
      :required="required"
      :readonly="readonly"
      :disabled="disabled"
  />

  <!-- URL -->
  <TextInput
      id="url"
      label="Website / URL"
      v-model="modelValue.url"
      name="url"
      type="url"
      placeholder="https://seusite.com.br (opcional)"
      :error="storeErrors?.url"
      :error-message="storeErrors?.url?.[0]"
      :required="false"
      :readonly="readonly"
      :disabled="disabled"
  />

  <!-- Endereço -->
  <TextInput
      id="endereco"
      label="Endereço"
      v-model="modelValue.endereco"
      name="endereco"
      placeholder="Rua, número, complemento"
      :error="storeErrors?.endereco"
      :error-message="storeErrors?.endereco?.[0]"
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

  <!-- Estado -->
  <TextInput
      id="estado"
      label="Estado (UF)"
      v-model="modelValue.estado"
      name="estado"
      placeholder="SP"
      maxlength="2"
      :error="storeErrors?.estado"
      :error-message="storeErrors?.estado?.[0]"
      :required="required"
      :readonly="readonly"
      :disabled="disabled"
  />

  <!-- CEP -->
  <TextInput
      id="cep"
      label="CEP"
      v-model="modelValue.cep"
      name="cep"
      placeholder="00000-000"
      :error="storeErrors?.cep"
      :error-message="storeErrors?.cep?.[0]"
      :required="required"
      :readonly="readonly"
      :disabled="disabled"
  />

  <!-- País -->
  <TextInput
      id="pais"
      label="País"
      v-model="modelValue.pais"
      name="pais"
      placeholder="Brasil"
      :error="storeErrors?.pais"
      :error-message="storeErrors?.pais?.[0]"
      :required="required"
      :readonly="readonly"
      :disabled="disabled"
  />

  <!-- CV -->
  <TextInput
      id="cv"
      label="Currículo / CV"
      v-model="modelValue.cv"
      name="cv"
      placeholder="Link para seu currículo (opcional)"
      :error="storeErrors?.cv"
      :error-message="storeErrors?.cv?.[0]"
      :required="false"
      :readonly="readonly"
      :disabled="disabled"
  />

  <!-- Disponível -->
  <div class="flex items-center">
    <input
        id="disponivel"
        type="checkbox"
        v-model="modelValue.disponivel"
        :disabled="disabled || readonly"
        class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
    />
    <label for="disponivel" class="ml-2 block text-sm text-gray-700">
      Disponível para novos contatos
    </label>
  </div>
</template>

<script setup>
import TextInput from "@/components/formulario/TextInput.vue";
import { computed } from "vue";

import { useRepresentateStore } from "@/stores/perfil/representante.store.js";

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
    default: () => ({
      apelido: '',
      whatsapp: '',
      email_contato: '',
      data_nascimento: '',
      operadora_id: null,
      empresa_id: null,
      empresa_outra: '',
      telefone_vendas: '',
      url: '',
      endereco: '',
      cidade: '',
      estado: '',
      cep: '',
      pais: 'Brasil',
      disponivel: true,
      cv: ''
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