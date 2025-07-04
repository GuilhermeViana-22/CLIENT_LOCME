<template>
  <!-- Nome da Agência -->
  <TextInput
      id="nome_agencia"
      label="Nome da Agência"
      v-model="modelValue.nome_agencia"
      name="nome_agencia"
      placeholder="Nome da sua agência"
      :error="storeErrors?.nome_agencia"
      :error-message="storeErrors?.nome_agencia?.[0]"
      :required="required"
      :readonly="readonly"
      :disabled="disabled"
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
  />

  <!-- Razão Social -->
  <TextInput
      id="razao_social"
      label="Razão Social"
      v-model="modelValue.razao_social"
      name="razao_social"
      placeholder="Razão social da empresa"
      :error="storeErrors?.razao_social"
      :error-message="storeErrors?.razao_social?.[0]"
      :required="required"
      :readonly="readonly"
      :disabled="disabled"
  />

  <!-- Nome Fantasia -->
  <TextInput
      id="nome_fantasia"
      label="Nome Fantasia"
      v-model="modelValue.nome_fantasia"
      name="nome_fantasia"
      placeholder="Nome fantasia da empresa"
      :error="storeErrors?.nome_fantasia"
      :error-message="storeErrors?.nome_fantasia?.[0]"
      :required="required"
      :readonly="readonly"
      :disabled="disabled"
  />

  <!-- Email Institucional -->
  <TextInput
      id="email_institucional"
      label="Email Institucional"
      type="email"
      v-model="modelValue.email_institucional"
      name="email_institucional"
      placeholder="contato@agencia.com.br"
      :error="storeErrors?.email_institucional"
      :error-message="storeErrors?.email_institucional?.[0]"
      :required="required"
      :readonly="readonly"
      :disabled="disabled"
  />

  <!-- Telefone/WhatsApp -->
  <TextInput
      id="telefone_whatsapp"
      label="Telefone/WhatsApp"
      v-model="modelValue.telefone_whatsapp"
      name="telefone_whatsapp"
      placeholder="(00) 00000-0000"
      mask="(##) #####-####"
      :error="storeErrors?.telefone_whatsapp"
      :error-message="storeErrors?.telefone_whatsapp?.[0]"
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
      placeholder="Cidade da agência"
      :error="storeErrors?.cidade"
      :error-message="storeErrors?.cidade?.[0]"
      :required="required"
      :readonly="readonly"
      :disabled="disabled"
  />

  <!-- UF -->
  <div>
    <label for="uf" class="block text-sm font-medium text-gray-700">
      Estado (UF) <span v-if="required" class="text-red-500">*</span>
    </label>
    <div class="mt-1">
      <select
          id="uf"
          v-model="modelValue.uf"
          name="uf"
          :required="required"
          :disabled="disabled || readonly"
          class="py-2 px-3 block w-full border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
          :class="{'border-red-400': storeErrors?.uf, 'border-gray-300': !storeErrors?.uf}"
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
    <div v-if="storeErrors?.uf" class="text-red-600 text-sm mt-1.5">
      {{ storeErrors.uf[0] }}
    </div>
  </div>

  <!-- Endereço Completo -->
  <TextInput
      id="endereco_completo"
      label="Endereço Completo"
      v-model="modelValue.endereco_completo"
      name="endereco_completo"
      placeholder="Rua, número, bairro"
      :error="storeErrors?.endereco_completo"
      :error-message="storeErrors?.endereco_completo?.[0]"
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
      mask="#####-###"
      :error="storeErrors?.cep"
      :error-message="storeErrors?.cep?.[0]"
      :required="required"
      :readonly="readonly"
      :disabled="disabled"
  />

  <!-- Tipo de Operação -->
  <div>
    <label for="tipo_operacao" class="block text-sm font-medium text-gray-700">
      Tipo de Operação <span v-if="required" class="text-red-500">*</span>
    </label>
    <div class="mt-1">
      <select
          id="tipo_operacao"
          v-model="modelValue.tipo_operacao"
          name="tipo_operacao"
          :required="required"
          :disabled="disabled || readonly"
          class="py-2 px-3 block w-full border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
          :class="{'border-red-400': storeErrors?.tipo_operacao, 'border-gray-300': !storeErrors?.tipo_operacao}"
      >
        <option value="" disabled>Selecione o tipo de operação</option>
        <option value="1">Agência de Viagem e Turismo</option>
        <option value="2">Operadora de Turismo</option>
        <option value="3">Organizadora de Eventos</option>
        <option value="4">Guia de Turismo</option>
        <option value="5">Meio de Hospedagem</option>
        <option value="6">Transportadora Turística</option>
        <option value="7">Prestadora de Infraestrutura de Apoio</option>
        <option value="8">Parques Temáticos</option>
      </select>
    </div>
    <div v-if="storeErrors?.tipo_operacao" class="text-red-600 text-sm mt-1.5">
      {{ storeErrors.tipo_operacao[0] }}
    </div>
  </div>

  <!-- CADASTUR -->
  <TextInput
      id="cadastur"
      label="CADASTUR"
      v-model="modelValue.cadastur"
      name="cadastur"
      placeholder="Número do CADASTUR"
      :error="storeErrors?.cadastur"
      :error-message="storeErrors?.cadastur?.[0]"
      :required="required"
      :readonly="readonly"
      :disabled="disabled"
  />

  <!-- Instagram -->
  <TextInput
      id="instagram"
      label="Instagram"
      v-model="modelValue.instagram"
      name="instagram"
      placeholder="@suaagencia"
      :error="storeErrors?.instagram"
      :error-message="storeErrors?.instagram?.[0]"
      :required="false"
      :readonly="readonly"
      :disabled="disabled"
  />

  <!-- Segmento Principal -->
  <div>
    <label for="segmento_principal_id" class="block text-sm font-medium text-gray-700">
      Segmento Principal <span v-if="required" class="text-red-500">*</span>
    </label>
    <div class="mt-1">
      <select
          id="segmento_principal_id"
          v-model="modelValue.segmento_principal_id"
          name="segmento_principal_id"
          :required="required"
          :disabled="disabled || readonly"
          class="py-2 px-3 block w-full border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
          :class="{'border-red-400': storeErrors?.segmento_principal_id, 'border-gray-300': !storeErrors?.segmento_principal_id}"
      >
        <option value="" disabled>Selecione o segmento principal</option>
        <option value="1">Turismo de Lazer</option>
        <option value="2">Turismo Corporativo</option>
        <option value="3">Turismo de Aventura</option>
        <option value="4">Turismo Cultural</option>
        <option value="5">Turismo Religioso</option>
        <option value="6">Turismo Rural</option>
        <option value="7">Turismo de Saúde</option>
        <option value="8">Turismo Gastronômico</option>
        <option value="9">Ecoturismo</option>
        <option value="10">Turismo de Eventos</option>
      </select>
    </div>
    <div v-if="storeErrors?.segmento_principal_id" class="text-red-600 text-sm mt-1.5">
      {{ storeErrors.segmento_principal_id[0] }}
    </div>
  </div>

  <!-- Excursões Próprias -->
  <div>
    <label for="excursoes_proprias" class="block text-sm font-medium text-gray-700">
      Organiza Excursões Próprias? <span v-if="required" class="text-red-500">*</span>
    </label>
    <div class="mt-1">
      <select
          id="excursoes_proprias"
          v-model="modelValue.excursoes_proprias"
          name="excursoes_proprias"
          :required="required"
          :disabled="disabled || readonly"
          class="py-2 px-3 block w-full border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
          :class="{'border-red-400': storeErrors?.excursoes_proprias, 'border-gray-300': !storeErrors?.excursoes_proprias}"
      >
        <option value="" disabled>Selecione uma opção</option>
        <option value="S">Sim</option>
        <option value="N">Não</option>
      </select>
    </div>
    <div v-if="storeErrors?.excursoes_proprias" class="text-red-600 text-sm mt-1.5">
      {{ storeErrors.excursoes_proprias[0] }}
    </div>
  </div>

  <!-- Aceita Excursões de Outras Agências -->
  <div>
    <label for="aceita_excursoes_outras" class="block text-sm font-medium text-gray-700">
      Aceita Excursões de Outras Agências? <span v-if="required" class="text-red-500">*</span>
    </label>
    <div class="mt-1">
      <select
          id="aceita_excursoes_outras"
          v-model="modelValue.aceita_excursoes_outras"
          name="aceita_excursoes_outras"
          :required="required"
          :disabled="disabled || readonly"
          class="py-2 px-3 block w-full border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
          :class="{'border-red-400': storeErrors?.aceita_excursoes_outras, 'border-gray-300': !storeErrors?.aceita_excursoes_outras}"
      >
        <option value="" disabled>Selecione uma opção</option>
        <option value="S">Sim</option>
        <option value="N">Não</option>
      </select>
    </div>
    <div v-if="storeErrors?.aceita_excursoes_outras" class="text-red-600 text-sm mt-1.5">
      {{ storeErrors.aceita_excursoes_outras[0] }}
    </div>
  </div>

  <!-- Checkboxes -->
  <div class="space-y-4">
    <!-- Recebe Representantes -->
    <div class="flex items-center">
      <input
          id="recebe_representantes"
          type="checkbox"
          v-model="modelValue.recebe_representantes"
          :disabled="disabled || readonly"
          class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
      />
      <label for="recebe_representantes" class="ml-2 block text-sm text-gray-700">
        Recebe representantes comerciais
      </label>
    </div>

    <!-- Necessita Agendamento -->
    <div class="flex items-center">
      <input
          id="necessita_agendamento"
          type="checkbox"
          v-model="modelValue.necessita_agendamento"
          :disabled="disabled || readonly"
          class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
      />
      <label for="necessita_agendamento" class="ml-2 block text-sm text-gray-700">
        Necessita agendamento para visitas
      </label>
    </div>

    <!-- Atende Freelance -->
    <div class="flex items-center">
      <input
          id="atende_freelance"
          type="checkbox"
          v-model="modelValue.atende_freelance"
          :disabled="disabled || readonly"
          class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
      />
      <label for="atende_freelance" class="ml-2 block text-sm text-gray-700">
        Atende agentes freelance
      </label>
    </div>

    <!-- Divulgar -->
    <div class="flex items-center">
      <input
          id="divulgar"
          type="checkbox"
          v-model="modelValue.divulgar"
          :disabled="disabled || readonly"
          class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
      />
      <label for="divulgar" class="ml-2 block text-sm text-gray-700">
        Autorizo divulgação dos meus dados no sistema
      </label>
    </div>
  </div>

  <!-- Descrição Livre -->
  <div>
    <label for="descricao_livre" class="block text-sm font-medium text-gray-700">
      Descrição da Agência
    </label>
    <div class="mt-1">
      <textarea
          id="descricao_livre"
          v-model="modelValue.descricao_livre"
          name="descricao_livre"
          rows="4"
          :disabled="disabled || readonly"
          class="py-2 px-3 block w-full border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
          :class="{'border-red-400': storeErrors?.descricao_livre, 'border-gray-300': !storeErrors?.descricao_livre}"
          placeholder="Descreva sua agência, especialidades, diferenciais..."
      ></textarea>
    </div>
    <div v-if="storeErrors?.descricao_livre" class="text-red-600 text-sm mt-1.5">
      {{ storeErrors.descricao_livre[0] }}
    </div>
  </div>
</template>

<script setup>
import TextInput from "@/components/formulario/TextInput.vue";
import CnpjInput from "@/components/formulario/CnpjInput.vue";
import { computed } from "vue";
import { useAgenciaViagemStore } from "@/stores/perfil/agenciaViagem.store.js";

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
    default: () => ({
      nome_agencia: '',
      cnpj: '',
      razao_social: '',
      nome_fantasia: '',
      email_institucional: '',
      telefone_whatsapp: '',
      cidade: '',
      uf: '',
      endereco_completo: '',
      cep: '',
      tipo_operacao: '',
      recebe_representantes: false,
      necessita_agendamento: false,
      atende_freelance: false,
      cadastur: '',
      instagram: '',
      segmento_principal_id: '',
      excursoes_proprias: '',
      aceita_excursoes_outras: '',
      descricao_livre: '',
      logo_path: '',
      divulgar: false
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

const store = useAgenciaViagemStore();

// Computed para os erros da store
const storeErrors = computed(() => store.errors);

// Event handlers
const onCnpjValidation = (validation) => {
  // Pode ser usado para feedback adicional se necessário
  console.log('CNPJ validation:', validation);
};
</script>

<style scoped>
/* Adicionar estilos específicos se necessário */
</style> 