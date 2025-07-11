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
      :viewMode="viewMode || false"
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
      :viewMode="viewMode || false"
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
      :viewMode="viewMode || false"
  />

  <!-- Telefone/WhatsApp -->
  <TelefoneInput
      id="telefone_whatsapp"
      label="Telefone/WhatsApp"
      v-model="modelValue.telefone_whatsapp"
      name="telefone_whatsapp"
      placeholder="(00) 00000-0000"
      :error="storeErrors?.telefone_whatsapp"
      :error-message="storeErrors?.telefone_whatsapp?.[0]"
      :required="required"
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

  <!-- Tipo de Operação -->
  <SelectInput
      :modelValue="modelValue.tipo_operacao_id"
      @update:modelValue="modelValue.tipo_operacao_id = $event"
      label="Tipo de Operação"
      name="tipo_operacao_id"
      type="number"
      placeholder="Selecione o tipo de operação"
      :error="storeErrors?.tipo_operacao_id"
      :error-message="storeErrors?.tipo_operacao_id?.[0]"
      :required="true"
      :readonly="readonly"
      :disabled="disabled"
      :viewMode="viewMode || false"
  >
    <option value="1">Agência de Viagem e Turismo</option>
    <option value="2">Operadora de Turismo</option>
    <option value="3">Organizadora de Eventos</option>
    <option value="4">Guia de Turismo</option>
    <option value="5">Meio de Hospedagem</option>
    <option value="6">Transportadora Turística</option>
    <option value="7">Prestadora de Infraestrutura de Apoio</option>
    <option value="8">Parques Temáticos</option>
  </SelectInput>

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
      :viewMode="viewMode || false"
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
      :viewMode="viewMode || false"
  />

  <!-- Segmento Principal -->
  <SelectInput
      :modelValue="modelValue.segmento_principal_id"
      @update:modelValue="modelValue.segmento_principal_id = $event"
      label="Segmento Principal"
      name="segmento_principal_id"
      type="number"
      placeholder="Selecione o segmento principal"
      :error="storeErrors?.segmento_principal_id"
      :error-message="storeErrors?.segmento_principal_id?.[0]"
      :required="true"
      :readonly="readonly"
      :disabled="disabled"
      :viewMode="viewMode || false"
  >
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
  </SelectInput>

  <!-- Excursões Próprias -->
  <ToggleSwitch
      id="excursoes_proprias"
      label="Organiza Excursões Próprias?"
      v-model="modelValue.excursoes_proprias"
      :required="false"
      :error="storeErrors?.excursoes_proprias"
      :error-message="storeErrors?.excursoes_proprias?.[0]"
      :readonly="readonly"
      :disabled="disabled"
      :viewMode="viewMode || false"
  />

  <!-- Aceita Excursões de Outras Agências -->
  <ToggleSwitch
      id="aceita_excursoes_outras"
      label="Aceita Excursões de Outras Agências?"
      v-model="modelValue.aceita_excursoes_outras"
      :required="false"
      :error="storeErrors?.aceita_excursoes_outras"
      :error-message="storeErrors?.aceita_excursoes_outras?.[0]"
      :readonly="readonly"
      :disabled="disabled"
      :viewMode="viewMode || false"
  />

  <!-- Recebe Representantes -->
  <ToggleSwitch
      id="recebe_representantes"
      label="Recebe representantes comerciais?"
      v-model="modelValue.recebe_representantes"
      :required="false"
      :error="storeErrors?.recebe_representantes"
      :error-message="storeErrors?.recebe_representantes?.[0]"
      :readonly="readonly"
      :disabled="disabled"
      :viewMode="viewMode || false"
  />

  <!-- Necessita Agendamento -->
  <ToggleSwitch
      id="necessita_agendamento"
      label="Necessita agendamento para visitas?"
      v-model="modelValue.necessita_agendamento"
      :required="false"
      :error="storeErrors?.necessita_agendamento"
      :error-message="storeErrors?.necessita_agendamento?.[0]"
      :readonly="readonly"
      :disabled="disabled"
      :viewMode="viewMode || false"
  />

  <!-- Atende Freelance -->
  <ToggleSwitch
      id="atende_freelance"
      label="Atende agentes freelance?"
      v-model="modelValue.atende_freelance"
      :required="false"
      :error="storeErrors?.atende_freelance"
      :error-message="storeErrors?.atende_freelance?.[0]"
      :readonly="readonly"
      :disabled="disabled"
      :viewMode="viewMode || false"
  />

  <!-- Divulgar -->
  <ToggleSwitch
      id="divulgar"
      label="Autorizo divulgação dos meus dados no sistema"
      v-model="modelValue.divulgar"
      :required="false"
      :error="storeErrors?.divulgar"
      :error-message="storeErrors?.divulgar?.[0]"
      :readonly="readonly"
      :disabled="disabled"
      :viewMode="viewMode || false"
  />

  <!-- Descrição Livre -->
  <TextArea
      id="descricao_livre"
      label="Descrição da Agência"
      v-model="modelValue.descricao_livre"
      :required="false"
      :error="storeErrors?.descricao_livre"
      :error-message="storeErrors?.descricao_livre?.[0]"
      :readonly="readonly"
      :disabled="disabled"
      :viewMode="viewMode || false"
      rows="6"
      placeholder="Descreva sua agência, especialidades, diferenciais..."
      class="w-full lg:col-span-2"
  />
</template>

<script setup>
import TextInput from "@/components/formulario/TextInput.vue";
import CnpjInput from "@/components/formulario/CnpjInput.vue";
import { computed } from "vue";
import { useAgenciaViagemStore } from "@/stores/perfil/agenciaViagem.store.js";
import TelefoneInput from "@/components/formulario/TelefoneInput.vue";
import EnderecoForm from "@/components/formulario/EnderecoForm.vue";
import SelectInput from "@/components/formulario/SelectInput.vue";
import ToggleSwitch from "@/components/formulario/ToggleSwitch.vue";
import TextArea from "@/components/formulario/TextArea.vue";

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

      endereco: {  // Todos campos de endereço movidos para aqui
        endereco: '',
        cidade: '',
        estado: '',
        cep: '',
        pais: 'Brasil',
      },

      cadastur: '',
      instagram: '',

      segmento_principal_id: '',
      tipo_operacao_id: '',

      excursoes_proprias: false,
      aceita_excursoes_outras: false,
      recebe_representantes: false,
      necessita_agendamento: false,
      atende_freelance: false,
      divulgar: false,

      descricao_livre: '',
      logo_path: '',
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