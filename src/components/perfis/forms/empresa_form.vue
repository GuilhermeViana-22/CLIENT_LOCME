<template>
  <div>
    <!-- Nome da Empresa -->
    <TextInput
      id="nome_empresa"
      label="Nome da Empresa"
      v-model="modelValue.nome_empresa"
      name="nome_empresa"
      placeholder="Nome da empresa"
      :error="storeErrors?.nome_empresa"
      :error-message="storeErrors?.nome_empresa?.[0]"
      :required="required"
      :readonly="readonly"
      :disabled="disabled"
    />
    <!-- Telefone -->
    <TextInput
      id="telefone"
      label="Telefone"
      v-model="modelValue.telefone"
      name="telefone"
      placeholder="(00) 00000-0000"
      :error="storeErrors?.telefone"
      :error-message="storeErrors?.telefone?.[0]"
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
      placeholder="contato@empresa.com"
      :error="storeErrors?.email_contato"
      :error-message="storeErrors?.email_contato?.[0]"
      :required="required"
      :readonly="readonly"
      :disabled="disabled"
    />
    <!-- URL -->
    <TextInput
      id="url"
      label="Website"
      v-model="modelValue.url"
      name="url"
      placeholder="https://empresa.com"
      :error="storeErrors?.url"
      :error-message="storeErrors?.url?.[0]"
      :required="false"
      :readonly="readonly"
      :disabled="disabled"
    />
    <!-- CADASTUR -->
    <TextInput
      id="cadastur"
      label="CADASTUR"
      v-model="modelValue.cadastur"
      name="cadastur"
      placeholder="Número do CADASTUR"
      :error="storeErrors?.cadastur"
      :error-message="storeErrors?.cadastur?.[0]"
      :required="false"
      :readonly="readonly"
      :disabled="disabled"
    />
    <!-- Condições Especiais -->
    <div class="flex items-center">
      <input
        id="condicoes_especiais"
        type="checkbox"
        v-model="modelValue.condicoes_especiais"
        :disabled="disabled || readonly"
        class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
      />
      <label for="condicoes_especiais" class="ml-2 block text-sm text-gray-700">
        Possui condições especiais?
      </label>
    </div>
    <!-- Condições (se marcado) -->
    <TextInput
      v-if="modelValue.condicoes_especiais"
      id="condicoes"
      label="Descreva as condições"
      v-model="modelValue.condicoes"
      name="condicoes"
      placeholder="Descreva as condições especiais"
      :error="storeErrors?.condicoes"
      :error-message="storeErrors?.condicoes?.[0]"
      :required="modelValue.condicoes_especiais && required"
      :readonly="readonly"
      :disabled="disabled"
    />
    <!-- Atividade ID -->
    <TextInput
      id="atividade_id"
      label="ID da Atividade"
      v-model="modelValue.atividade_id"
      name="atividade_id"
      placeholder="ID da atividade principal"
      :error="storeErrors?.atividade_id"
      :error-message="storeErrors?.atividade_id?.[0]"
      :required="required"
      :readonly="readonly"
      :disabled="disabled"
    />
    <!-- Unidades/Localidades -->
    <TextInput
      id="unidades_localidades"
      label="Unidades/Localidades"
      v-model="modelValue.unidades_localidades"
      name="unidades_localidades"
      placeholder="Unidades ou localidades da empresa"
      :error="storeErrors?.unidades_localidades"
      :error-message="storeErrors?.unidades_localidades?.[0]"
      :required="false"
      :readonly="readonly"
      :disabled="disabled"
    />
    <!-- Produtos/Serviços -->
    <TextInput
      id="produtos_servicos"
      label="Produtos/Serviços"
      v-model="modelValue.produtos_servicos"
      name="produtos_servicos"
      placeholder="Produtos ou serviços oferecidos"
      :error="storeErrors?.produtos_servicos"
      :error-message="storeErrors?.produtos_servicos?.[0]"
      :required="required"
      :readonly="readonly"
      :disabled="disabled"
    />
    <!-- Nome do Cadastro -->
    <TextInput
      id="nome_cadastro"
      label="Nome do Responsável pelo Cadastro"
      v-model="modelValue.nome_cadastro"
      name="nome_cadastro"
      placeholder="Nome do responsável pelo cadastro"
      :error="storeErrors?.nome_cadastro"
      :error-message="storeErrors?.nome_cadastro?.[0]"
      :required="required"
      :readonly="readonly"
      :disabled="disabled"
    />
    <!-- Cargo do Cadastro -->
    <TextInput
      id="cargo_cadastro"
      label="Cargo do Responsável"
      v-model="modelValue.cargo_cadastro"
      name="cargo_cadastro"
      placeholder="Cargo do responsável pelo cadastro"
      :error="storeErrors?.cargo_cadastro"
      :error-message="storeErrors?.cargo_cadastro?.[0]"
      :required="required"
      :readonly="readonly"
      :disabled="disabled"
    />
    <!-- Endereço -->
    <TextInput
      id="endereco"
      label="Endereço"
      v-model="modelValue.endereco"
      name="endereco"
      placeholder="Endereço completo"
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
      placeholder="Cidade"
      :error="storeErrors?.cidade"
      :error-message="storeErrors?.cidade?.[0]"
      :required="required"
      :readonly="readonly"
      :disabled="disabled"
    />
    <!-- Estado -->
    <TextInput
      id="estado"
      label="Estado"
      v-model="modelValue.estado"
      name="estado"
      placeholder="Estado (UF)"
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
      placeholder="País"
      :error="storeErrors?.pais"
      :error-message="storeErrors?.pais?.[0]"
      :required="required"
      :readonly="readonly"
      :disabled="disabled"
    />
  </div>
</template>

<script setup>
import TextInput from '@/components/formulario/TextInput.vue';
import { computed } from 'vue';
import { useEmpresaStore } from '@/stores/perfil/empresa.store.js';

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
    default: () => ({})
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

const store = useEmpresaStore();
const storeErrors = computed(() => store.errors);
</script> 