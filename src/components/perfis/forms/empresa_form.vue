<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <!-- Nome da Empresa -->
    <div class="md:col-span-2">
      <TextInput
        id="nome_empresa"
        label="Nome da Empresa"
        v-model="localForm.nome_empresa"
        placeholder="Digite o nome completo da empresa"
        :error="errors.nome_empresa"
        :required="required"
        class="w-full"
      />
    </div>

    <!-- Telefone e Email -->
    <div>
      <TextInput
        id="telefone"
        label="Telefone"
        v-model="localForm.telefone"
        placeholder="(00) 00000-0000"
        mask="(##) #####-####"
        :error="errors.telefone"
        :required="required"
        class="w-full"
      />
    </div>
    <div>
      <TextInput
        id="email_contato"
        label="Email de Contato"
        v-model="localForm.email_contato"
        placeholder="contato@empresa.com"
        type="email"
        :error="errors.email_contato"
        :required="required"
        class="w-full"
      />
    </div>

    <!-- Website e Cadastur -->
    <div>
      <TextInput
        id="url"
        label="Website"
        v-model="localForm.url"
        placeholder="https://suaempresa.com"
        type="url"
        :error="errors.url"
        class="w-full"
      />
    </div>
    <div>
      <TextInput
        id="cadastur"
        label="CADASTUR"
        v-model="localForm.cadastur"
        placeholder="Número do cadastur"
        :error="errors.cadastur"
        class="w-full"
      />
    </div>

    <!-- Checkbox Condições Especiais -->
    <div class="md:col-span-2 flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
      <input
        id="condicoes_especiais"
        type="checkbox"
        v-model="localForm.condicoes_especiais"
        class="h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
      />
      <label for="condicoes_especiais" class="block text-sm font-medium text-gray-700">
        Oferece condições especiais?
      </label>
    </div>

    <!-- Descrição das Condições Especiais -->
    <div v-if="localForm.condicoes_especiais" class="md:col-span-2">
      <TextInput
        id="condicoes"
        label="Descreva as condições especiais"
        v-model="localForm.condicoes"
        placeholder="Descreva as condições oferecidas"
        type="textarea"
        rows="3"
        :error="errors.condicoes"
        :required="localForm.condicoes_especiais && required"
        class="w-full"
      />
    </div>

    <!-- Atividade e Unidades -->
    <div>
      <TextInput
        id="atividade_id"
        label="Atividade Principal"
        v-model="localForm.atividade_id"
        placeholder="Código da atividade"
        :error="errors.atividade_id"
        :required="required"
        class="w-full"
      />
    </div>
    <div>
      <TextInput
        id="unidades_localidades"
        label="Unidades/Localidades"
        v-model="localForm.unidades_localidades"
        placeholder="Locais de atuação"
        :error="errors.unidades_localidades"
        class="w-full"
      />
    </div>

    <!-- Produtos/Serviços -->
    <div class="md:col-span-2">
      <TextInput
        id="produtos_servicos"
        label="Produtos/Serviços"
        v-model="localForm.produtos_servicos"
        placeholder="Lista de produtos ou serviços oferecidos"
        type="textarea"
        rows="2"
        :error="errors.produtos_servicos"
        :required="required"
        class="w-full"
      />
    </div>

    <!-- Responsável pelo Cadastro -->
    <div class="md:col-span-2 mt-4 pt-4 border-t border-gray-200">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Responsável pelo Cadastro</h3>
      <div class="grid md:grid-cols-2 gap-6">
        <div>
          <TextInput
            id="nome_cadastro"
            label="Nome Completo"
            v-model="localForm.nome_cadastro"
            placeholder="Nome do responsável"
            :error="errors.nome_cadastro"
            :required="required"
            class="w-full"
          />
        </div>
        <div>
          <TextInput
            id="cargo_cadastro"
            label="Cargo"
            v-model="localForm.cargo_cadastro"
            placeholder="Cargo/função"
            :error="errors.cargo_cadastro"
            :required="required"
            class="w-full"
          />
        </div>
      </div>
    </div>

    <!-- Endereço -->
    <div class="md:col-span-2 mt-4 pt-4 border-t border-gray-200">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Endereço da Empresa</h3>
      <div class="mb-4">
        <TextInput
          id="endereco"
          label="Endereço Completo"
          v-model="localForm.endereco"
          placeholder="Rua, número, complemento"
          :error="errors.endereco"
          :required="required"
          class="w-full"
        />
      </div>
      <div class="grid md:grid-cols-3 gap-6">
        <div>
          <TextInput
            id="cidade"
            label="Cidade"
            v-model="localForm.cidade"
            placeholder="Cidade"
            :error="errors.cidade"
            :required="required"
            class="w-full"
          />
        </div>
        <div>
          <TextInput
            id="estado"
            label="Estado"
            v-model="localForm.estado"
            placeholder="UF"
            maxlength="2"
            :error="errors.estado"
            :required="required"
            class="w-full"
          />
        </div>
        <div>
          <TextInput
            id="cep"
            label="CEP"
            v-model="localForm.cep"
            placeholder="00000-000"
            mask="#####-###"
            :error="errors.cep"
            :required="required"
            class="w-full"
          />
        </div>
      </div>
      <div class="mt-4">
        <TextInput
          id="pais"
          label="País"
          v-model="localForm.pais"
          placeholder="País"
          :error="errors.pais"
          :required="required"
          class="w-full"
        />
      </div>
    </div>

    <!-- Botão de Submit -->
    <div class="md:col-span-2 mt-8">
      <button
        type="button"
        @click="$emit('submit')"
        class="w-full md:w-auto px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
      >
        <span v-if="!loading">Salvar Empresa</span>
        <span v-else class="flex items-center justify-center">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processando...
        </span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import TextInput from '@/components/formulario/TextInput.vue';

const props = defineProps({
  modelValue: Object,
  errors: { type: Object, default: () => ({}) },
  required: { type: Boolean, default: true },
  loading: { type: Boolean, default: false }
});

const emit = defineEmits(['update:model-value', 'submit']);

const localForm = ref(JSON.parse(JSON.stringify(props.modelValue)));

watch(localForm, (newValue) => {
  emit('update:model-value', JSON.parse(JSON.stringify(newValue)));
}, { deep: true });

watch(() => props.modelValue, (newValue) => {
  localForm.value = JSON.parse(JSON.stringify(newValue));
}, { deep: true });
</script>

<style scoped>
button {
  min-width: 200px;
}
textarea {
  min-height: 80px;
}
</style>
