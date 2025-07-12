<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <!-- Nome da Empresa -->
    <TextInput
        id="nome_empresa"
        label="Nome da Empresa"
        v-model="modelValue.nome_empresa"
        name="nome_empresa"
        placeholder="Digite o nome completo da empresa"
        :error="storeErrors?.nome_empresa"
        :error-message="storeErrors?.nome_empresa?.[0]"
        :required="required"
        :readonly="readonly"
        :disabled="disabled"
        class="w-full"

        :viewMode="viewMode || false"
    />

    <!-- CNPJ -->
    <CnpjInput
        id="cnpj"
        label="CNPJ"
        v-model="modelValue.cnpj"
        name="cnpj"
        placeholder="00.000.000/0000-00"
        :error="storeErrors?.cnpj"
        :error-message="storeErrors?.cnpj?.[0]"
        :required="required"
        :readonly="readonly"
        :disabled="disabled"
        @validation="onCnpjValidation"
        :viewMode="viewMode || false"
    />

    <!-- Telefone e Email -->

    <TelefoneInput
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
        class="w-full"

        :viewMode="viewMode || false"
    />


    <TextInput
        id="email_contato"
        label="Email de Contato"
        v-model="modelValue.email_contato"
        name="email_contato"
        placeholder="contato@empresa.com"
        type="email"
        :error="storeErrors?.email_contato"
        :error-message="storeErrors?.email_contato?.[0]"
        :required="required"
        :readonly="readonly"
        :disabled="disabled"
        class="w-full"

        :viewMode="viewMode || false"
    />


    <!-- Website e Cadastur -->

    <TextInput
        id="url"
        label="Website"
        v-model="modelValue.url"
        name="url"
        placeholder="https://suaempresa.com"
        type="url"
        :error="storeErrors?.url"
        :error-message="storeErrors?.url?.[0]"
        :readonly="readonly"
        :disabled="disabled"
        class="w-full"

        :viewMode="viewMode || false"
    />


    <TextInput
        id="cadastur"
        label="CADASTUR"
        v-model="modelValue.cadastur"
        name="cadastur"
        placeholder="Número do cadastur"
        :error="storeErrors?.cadastur"
        :error-message="storeErrors?.cadastur?.[0]"
        :readonly="readonly"
        :disabled="disabled"
        class="w-full"

        :viewMode="viewMode || false"
    />


    <ToggleSwitch
        id="condicoes_especiais"
        label="Oferece condições especiais?"
        v-model="modelValue.condicoes_especiais"
        :required="false"
        :error="storeErrors?.condicoes_especiais"
        :error-message="storeErrors?.condicoes_especiais?.[0]"
        :readonly="readonly"
        :disabled="disabled"

        :viewMode="viewMode || false"
    />

    <!-- Descrição das Condições Especiais -->
    <TextArea
        v-if="modelValue.condicoes_especiais"

        id="condicoes"
        label="Descreva as condições especiais"
        v-model="modelValue.condicoes"
        :required="false"
        :error="storeErrors?.condicoes"
        :error-message="storeErrors?.condicoes?.[0]"
        :readonly="readonly"
        :disabled="disabled"
        rows="6"
        placeholder="Descreva as condições oferecidas..."
        class="w-full lg:col-span-2"

        :viewMode="viewMode || false"
    />

    <!-- Atividade e Unidades -->

    <MultiComboBox
        v-model="modelValue.atividades"
        :options="[
            { id: 1, name: 'Atividade 1' },
            { id: 2, name: 'Atividade 2' },
            { id: 3, name: 'Atividade 3' }
          ]"
        option-label="name"
        option-value="id"
        label="Atividades"
        placeholder="Digite para buscar..."

        :error="storeErrors?.atividades"
        :error-message="storeErrors?.atividades?.[0]"
        :required="required"
        :readonly="readonly"
        :disabled="disabled"

        :viewMode="viewMode || false"
    />


    <MultiComboBox
        v-model="modelValue.unidades_localidades"
        :options="[
            { id: 1, name: 'Norte' },
            { id: 2, name: 'Sul' },
            { id: 3, name: 'Leste' },
            { id: 4, name: 'Oeste' },
          ]"
        option-label="name"
        option-value="id"
        label="Unidades/Localidades"
        placeholder="Digite para buscar..."

        :error="storeErrors?.unidades_localidades"
        :error-message="storeErrors?.unidades_localidades?.[0]"
        :required="required"
        :readonly="readonly"
        :disabled="disabled"

        :viewMode="viewMode || false"
    />

    <!-- Produtos/Serviços -->
    <MultiComboBox
        v-model="modelValue.produtos_servicos"
        :options="[
            { id: 1, name: 'Produto 1' },
            { id: 2, name: 'Produto 2' },
            { id: 3, name: 'Produto 3' },
            { id: 4, name: 'Produto 4' },
          ]"
        option-label="name"
        option-value="id"
        label="Produtos/Serviços"
        placeholder="Digite para buscar..."

        :error="storeErrors?.produtos_servicos"
        :error-message="storeErrors?.produtos_servicos?.[0]"
        :required="required"
        :readonly="readonly"
        :disabled="disabled"

        :viewMode="viewMode || false"
    />

    <!-- Responsável pelo Cadastro -->
    <div class="md:col-span-2 mt-4 pt-4 border-t border-gray-200">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Responsável pelo Cadastro</h3>
      <div class="grid md:grid-cols-2 gap-6">
        <div>
          <TextInput
              id="nome_cadastro"
              label="Nome Completo"
              v-model="modelValue.nome_cadastro"
              name="nome_cadastro"
              placeholder="Nome do responsável"
              :error="storeErrors?.nome_cadastro"
              :error-message="storeErrors?.nome_cadastro?.[0]"
              :required="required"
              :readonly="readonly"
              :disabled="disabled"
              class="w-full"

              :viewMode="viewMode || false"
          />
        </div>
        <div>
          <TextInput
              id="cargo_cadastro"
              label="Cargo"
              v-model="modelValue.cargo_cadastro"
              name="cargo_cadastro"
              placeholder="Cargo/função"
              :error="storeErrors?.cargo_cadastro"
              :error-message="storeErrors?.cargo_cadastro?.[0]"
              :required="required"
              :readonly="readonly"
              :disabled="disabled"
              class="w-full"

              :viewMode="viewMode || false"
          />
        </div>
      </div>
    </div>

    <!-- Endereço -->
    <EnderecoForm
        v-model="modelValue.endereco"
        :store-errors="storeErrors"
        :required="true"
        :readonly="false"
        :disabled="false"
        :viewMode="viewMode || false"
    />
  </div>
</template>

<script setup>
import TextInput from '@/components/formulario/TextInput.vue';
import { computed } from 'vue';
import { useEmpresaStore } from '@/stores/perfil/empresa.store.js';
import MultiComboBox from "@/components/formulario/MultiComboBox.vue";
import EnderecoForm from "@/components/formulario/EnderecoForm.vue";
import ToggleSwitch from "@/components/formulario/ToggleSwitch.vue";
import TextArea from "@/components/formulario/TextArea.vue";
import TelefoneInput from "@/components/formulario/TelefoneInput.vue";
import CnpjInput from "@/components/formulario/CnpjInput.vue";

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
    default: () => ({
      cnpj: '',
      nome_empresa: '',
      telefone: '',
      email_contato: '',
      url: '',
      cadastur: '',
      condicoes_especiais: false,
      condicoes: '',

      atividades: [],
      unidades_localidades: [],
      produtos_servicos: [],

      nome_cadastro: '',
      cargo_cadastro: '',

      endereco: {  // Todos campos de endereço movidos para aqui
        endereco: '',
        cidade: '',
        estado: '',
        cep: '',
        pais: 'Brasil',
      },
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

const store = useEmpresaStore();

// Computed para os erros da store
const storeErrors = computed(() => store.errors);
</script>

<style scoped>
button {
  min-width: 200px;
}
textarea {
  min-height: 80px;
}
</style>