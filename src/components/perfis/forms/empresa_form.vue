<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <!-- Nome da Empresa -->
    <div class="md:col-span-2">
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
      />
    </div>

    <!-- Telefone e Email -->
    <div>
      <TextInput
          id="telefone"
          label="Telefone"
          v-model="modelValue.telefone"
          name="telefone"
          placeholder="(00) 00000-0000"
          mask="(##) #####-####"
          :error="storeErrors?.telefone"
          :error-message="storeErrors?.telefone?.[0]"
          :required="required"
          :readonly="readonly"
          :disabled="disabled"
          class="w-full"
      />
    </div>
    <div>
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
      />
    </div>

    <!-- Website e Cadastur -->
    <div>
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
      />
    </div>
    <div>
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
      />
    </div>

    <!-- Checkbox Condições Especiais -->
    <div class="md:col-span-2 flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
      <input
          id="condicoes_especiais"
          type="checkbox"
          v-model="modelValue.condicoes_especiais"
          :disabled="disabled || readonly"
          class="h-5 w-5 text-primary focus:ring-primary border-gray-300 rounded"
      />
      <label for="condicoes_especiais" class="block text-sm font-medium text-gray-700">
        Oferece condições especiais?
      </label>
    </div>

    <!-- Descrição das Condições Especiais -->
    <div v-if="modelValue.condicoes_especiais" class="md:col-span-2">
      <div>
        <label for="condicoes" class="block text-sm font-medium text-gray-700">
          Descreva as condições especiais <span v-if="required" class="text-red-500">*</span>
        </label>
        <div class="mt-1">
          <textarea
              id="condicoes"
              v-model="modelValue.condicoes"
              name="condicoes"
              rows="3"
              :disabled="disabled || readonly"
              class="py-2 px-3 block w-full border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              :class="{'border-red-400': storeErrors?.condicoes, 'border-gray-300': !storeErrors?.condicoes}"
              placeholder="Descreva as condições oferecidas"
          ></textarea>
        </div>
        <div v-if="storeErrors?.condicoes" class="text-red-600 text-sm mt-1.5">
          {{ storeErrors.condicoes[0] }}
        </div>
      </div>
    </div>

    <!-- Atividade e Unidades -->
    <div>
      <TextInput
          id="atividade_id"
          label="Atividade Principal"
          v-model="modelValue.atividade_id"
          name="atividade_id"
          placeholder="Código da atividade"
          :error="storeErrors?.atividade_id"
          :error-message="storeErrors?.atividade_id?.[0]"
          :required="required"
          :readonly="readonly"
          :disabled="disabled"
          class="w-full"
      />
    </div>
    <div>
      <TextInput
          id="unidades_localidades"
          label="Unidades/Localidades"
          v-model="modelValue.unidades_localidades"
          name="unidades_localidades"
          placeholder="Locais de atuação"
          :error="storeErrors?.unidades_localidades"
          :error-message="storeErrors?.unidades_localidades?.[0]"
          :readonly="readonly"
          :disabled="disabled"
          class="w-full"
      />
    </div>

    <!-- Produtos/Serviços -->
    <div class="md:col-span-2">
      <div>
        <label for="produtos_servicos" class="block text-sm font-medium text-gray-700">
          Produtos/Serviços <span v-if="required" class="text-red-500">*</span>
        </label>
        <div class="mt-1">
          <textarea
              id="produtos_servicos"
              v-model="modelValue.produtos_servicos"
              name="produtos_servicos"
              rows="3"
              :disabled="disabled || readonly"
              class="py-2 px-3 block w-full border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              :class="{'border-red-400': storeErrors?.produtos_servicos, 'border-gray-300': !storeErrors?.produtos_servicos}"
              placeholder="Lista de produtos ou serviços oferecidos"
          ></textarea>
        </div>
        <div v-if="storeErrors?.produtos_servicos" class="text-red-600 text-sm mt-1.5">
          {{ storeErrors.produtos_servicos[0] }}
        </div>
      </div>
    </div>

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
            v-model="modelValue.endereco"
            name="endereco"
            placeholder="Rua, número, complemento"
            :error="storeErrors?.endereco"
            :error-message="storeErrors?.endereco?.[0]"
            :required="required"
            :readonly="readonly"
            :disabled="disabled"
            class="w-full"
        />
      </div>
      <div class="grid md:grid-cols-3 gap-6">
        <div>
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
              class="w-full"
          />
        </div>
        <div>
          <label for="estado" class="block text-sm font-medium text-gray-700">
            Estado (UF) <span v-if="required" class="text-red-500">*</span>
          </label>
          <div class="mt-1">
            <select
                id="estado"
                v-model="modelValue.estado"
                name="estado"
                :required="required"
                :disabled="disabled || readonly"
                class="py-2 px-3 block w-full border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                :class="{'border-red-400': storeErrors?.estado, 'border-gray-300': !storeErrors?.estado}"
            >
              <option value="" disabled>Selecione o estado</option>
              <option value="AC">Acre</option>
              <option value="AL">Alagoas</option>
              <option value="AP">Amapá</option>
              <option value="AM">Amazonas</option>
              <option value="BA">Bahia</option>
              <option value="CE">Ceará</option>
              <option value="DF">Distrito Federal</option>
              <option value="ES">Espírito Santo</option>
              <option value="GO">Goiás</option>
              <option value="MA">Maranhão</option>
              <option value="MT">Mato Grosso</option>
              <option value="MS">Mato Grosso do Sul</option>
              <option value="MG">Minas Gerais</option>
              <option value="PA">Pará</option>
              <option value="PB">Paraíba</option>
              <option value="PR">Paraná</option>
              <option value="PE">Pernambuco</option>
              <option value="PI">Piauí</option>
              <option value="RJ">Rio de Janeiro</option>
              <option value="RN">Rio Grande do Norte</option>
              <option value="RS">Rio Grande do Sul</option>
              <option value="RO">Rondônia</option>
              <option value="RR">Roraima</option>
              <option value="SC">Santa Catarina</option>
              <option value="SP">São Paulo</option>
              <option value="SE">Sergipe</option>
              <option value="TO">Tocantins</option>
            </select>
          </div>
          <div v-if="storeErrors?.estado" class="text-red-600 text-sm mt-1.5">
            {{ storeErrors.estado[0] }}
          </div>
        </div>
        <div>
          <TextInput
              id="cep"
              label="CEP"
              v-model="modelValue.cep"
              name="cep"
              placeholder="00000-000"
              mask="#####-###"
              :error="storeErrors?.cep"
              :error-message="storeErrors?.cep?.[0]"
              :required="required"
              :readonly="readonly"
              :disabled="disabled"
              class="w-full"
          />
        </div>
      </div>
      <div class="mt-4">
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
            class="w-full"
        />
      </div>
    </div>
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
    default: () => ({
      nome_empresa: '',
      telefone: '',
      email_contato: '',
      url: '',
      cadastur: '',
      condicoes_especiais: false,
      condicoes: '',
      atividade_id: '',
      unidades_localidades: '',
      produtos_servicos: '',
      nome_cadastro: '',
      cargo_cadastro: '',
      endereco: '',
      cidade: '',
      estado: '',
      cep: '',
      pais: ''
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