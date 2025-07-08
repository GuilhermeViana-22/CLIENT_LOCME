<template>

  <TextInput
      id="nome"
      label="Nome"
      v-model="modelValue.nome"
      name="nome"
      type="text"
      placeholder="Nome"
      :error="storeErrors?.nome"
      :error-message="storeErrors?.nome?.[0]"
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
      placeholder="seu.email@exemplo.com"
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

  <SelectInput
      :modelValue="modelValue.operadora_id"
      @update:modelValue="modelValue.operadora_id = $event"
      id="operadora_id"
      name="operadora_id"
      label="Operadora"
      placeholder="Selecione a operadora"
      :required="required"
      :disabled="disabled"
      :readonly="readonly"
      :error="storeErrors?.operadora_id"
      :error-message="storeErrors?.operadora_id?.[0]"
      :viewMode="viewMode || false"
  >
    <option value="1">Operadora 1</option>
    <option value="2">Operadora 2</option>
    <option value="3">Operadora 3</option>
  </SelectInput>

  <!-- Empresa que ele representa -->
  <SelectInput
      :modelValue="modelValue.empresa_id"
      @update:modelValue="modelValue.empresa_id = $event"
      label="Empresa"
      name="empresa_id"
      type="number"
      placeholder="Selecione uma empresa (opcional)"
      :error="storeErrors?.empresa_id"
      :error-message="storeErrors?.empresa_id?.[0]"
      :required="false"
      :readonly="readonly"
      :disabled="disabled"
      :viewMode="viewMode || false"
  >
    <option value="1">Empresa 1</option>
    <option value="2">Empresa 2</option>
    <option value="3">Empresa 3</option>
  </SelectInput>

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
      :viewMode="viewMode || false"
  />

  <TelefoneInput
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
      :viewMode="viewMode || false"
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
      :viewMode="viewMode || false"
  />


  <!-- Endereço -->
  <EnderecoForm
      v-model="modelValue.endereco"
      :store-errors="storeErrors"
      :required="true"
      :readonly="false"
      :disabled="false"
      :viewMode="viewMode || false"
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
      :viewMode="viewMode || false"
  />

  <ToggleSwitch
      id="disponivel"
      label="Disponível para novos contatos"
      v-model="modelValue.disponivel"
      :required="false"
      :error="storeErrors?.disponivel"
      :error-message="storeErrors?.disponivel?.[0]"
      :readonly="readonly"
      :disabled="disabled"
      :viewMode="viewMode"
  />
</template>

<script setup>
import TextInput from "@/components/formulario/TextInput.vue";
import { computed } from "vue";

import { useRepresentateStore } from "@/stores/perfil/representante.store.js";
import CpfInput from "@/components/formulario/CpfInput.vue";
import TelefoneInput from "@/components/formulario/TelefoneInput.vue";
import EnderecoForm from "@/components/formulario/EnderecoForm.vue";
import ToggleSwitch from "@/components/formulario/ToggleSwitch.vue";
import SelectInput from "@/components/formulario/SelectInput.vue";

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
    default: () => ({
      nome: '',
      whatsapp: '',
      email_contato: '',
      data_nascimento: '',
      operadora_id: null,
      empresa_id: null,
      empresa_outra: '',
      telefone_vendas: '',
      url: '',
      endereco: {  // Todos campos de endereço movidos para aqui
        endereco: '',
        cidade: '',
        estado: '',
        cep: '',
        pais: 'Brasil',
      },
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
  },
  viewMode: {
    type: Boolean,
    default: false
  }
});

const store = useRepresentateStore();

// Computed para os erros da store
const storeErrors = computed(() => store.errors);
</script>