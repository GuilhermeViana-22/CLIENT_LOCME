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

  <!-- WhatsApp -->
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

  <!-- UF -->
  <SelectInput
      :modelValue="modelValue.uf"
      @update:modelValue="modelValue.uf = $event"
      id="uf"
      label="Estado (UF)"
      name="uf"
      placeholder="Selecione o estado"
      maxlength="2"
      :error="storeErrors?.uf"
      :error-message="storeErrors?.uf?.[0]"
      :required="required"
      :readonly="readonly"
      :disabled="disabled"
      :viewMode="viewMode || false"
  >
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
  </SelectInput>

  <!-- Cidade -->
  <CidadeSelect
      :modelValue="modelValue.cidade"
      @update:modelValue="modelValue.cidade = $event"
      :uf="modelValue.uf"
      label="Cidade"
      placeholder="Comece a digitar o nome da cidade"
      :required="true"
      :error="storeErrors?.cidade"
      :error-message="storeErrors?.cidade?.[0]"
      :disabled="disabled"
      :viewMode="viewMode || false"
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
      :viewMode="viewMode || false"
  />

  <!-- Vinculado à Agência -->
  <ToggleSwitch
      id="vinculado_agencia"
      label="Vinculado à uma agência"
      v-model="modelValue.vinculado_agencia"
      :required="false"
      :error="storeErrors?.vinculado_agencia"
      :error-message="storeErrors?.vinculado_agencia?.[0]"
      :readonly="readonly"
      :disabled="disabled || readonly"
      :viewMode="viewMode || false"
  />

  <!-- Agência Vinculada (aparece apenas se vinculado_agencia for true) -->
  <AsyncSelectInput
      v-if="modelValue.vinculado_agencia"
      :modelValue="modelValue.agencia_id"
      @update:modelValue="modelValue.agencia_id = $event"
      id="agencia_id"
      name="agencia_id"
      label="Agência Vinculada"
      placeholder="Digite para pesquisar agências..."
      :required="required"
      :disabled="disabled"
      :readonly="readonly"
      :error="storeErrors?.agencia_id"
      :error-message="storeErrors?.agencia_id?.[0]"
      :fetchOptions="fetchAgencias"
      debounceTime="500"
      minSearchLength="2"
      :viewMode="viewMode || false"
  />

  <!-- Tem CNPJ Próprio -->
  <ToggleSwitch
      id="tem_cnpj_proprio"
      label="Tenho CNPJ próprio"
      v-model="modelValue.tem_cnpj_proprio"
      :required="false"
      :error="storeErrors?.tem_cnpj_proprio"
      :error-message="storeErrors?.tem_cnpj_proprio?.[0]"
      :readonly="readonly"
      :disabled="disabled || readonly"
      :viewMode="viewMode || false"
  />

  <!-- CNPJ -->
  <CnpjInput
      v-if="modelValue.tem_cnpj_proprio"
      id="cnpj"
      label="CNPJ Próprio"
      v-model="modelValue.cnpj_proprio"
      name="cnpj"
      placeholder="00.000.000/0000-00"
      :error="storeErrors?.cnpj_proprio"
      :error-message="storeErrors?.cnpj_proprio?.[0]"
      :required="required"
      :readonly="readonly"
      :disabled="disabled"
      :viewMode="viewMode || false"
  />

  <!-- Aceita Contato de Representantes -->
  <ToggleSwitch
      id="aceita_contato_representantes"
      label="Aceito contato de representantes"
      v-model="modelValue.aceita_contato_representantes"
      :required="false"
      :error="storeErrors?.aceita_contato_representantes"
      :error-message="storeErrors?.aceita_contato_representantes?.[0]"
      :readonly="readonly"
      :disabled="disabled || readonly"
      :viewMode="viewMode || false"
  />
</template>

<script setup>
import TextInput from "@/components/formulario/TextInput.vue";
import CpfInput from "@/components/formulario/CpfInput.vue";
import { computed } from "vue";

import { useAgenteViagemStore } from "@/stores/perfil/agenteViagem.store.js";
import SelectInput from "@/components/formulario/SelectInput.vue";
import ToggleSwitch from "@/components/formulario/ToggleSwitch.vue";
import TelefoneInput from "@/components/formulario/TelefoneInput.vue";
import AsyncSelectInput from "@/components/formulario/AsyncSelectInput.vue";
import CidadeSelect from "@/components/formulario/AsyncSelectCidade.vue";
import CnpjInput from "@/components/formulario/CnpjInput.vue";

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
    default: () => ({
      bio: '',
      nome_completo: '',
      data_nascimento: '',
      cpf: '',
      whatsapp: '',
      uf: '',
      cidade: '',
      portfolio_redes_sociais: '',
      vinculado_agencia: '',
      agencia_id: '',
      tem_cnpj_proprio: '',
      cnpj_proprio: '',
      aceita_contato_representantes: ''
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

const store = useAgenteViagemStore();

// Computed para os erros da store
const storeErrors = computed(() => store.errors);

const fetchAgencias = async function(searchQuery, currentValue = null) {
  return new Promise((resolve) => {

    const agenciasMock = [
      { id: 1, nome: 'Agência Centro - 001', cidade: 'São Paulo' },
      { id: 2, nome: 'Agência Vila Olímpia - 002', cidade: 'São Paulo' },
      { id: 3, nome: 'Agência Copacabana - 003', cidade: 'Rio de Janeiro' },
      { id: 4, nome: 'Agência Ipanema - 004', cidade: 'Rio de Janeiro' },
      { id: 5, nome: 'Agência Savassi - 005', cidade: 'Belo Horizonte' },
      { id: 6, nome: 'Agência Barra - 006', cidade: 'Salvador' },
      { id: 7, nome: 'Agência Boa Viagem - 007', cidade: 'Recife' },
      { id: 8, nome: 'Agência Batel - 008', cidade: 'Curitiba' },
      { id: 9, nome: 'Agência Moema - 009', cidade: 'São Paulo' },
      { id: 10, nome: 'Agência Jardins - 010', cidade: 'São Paulo' },
    ];

    // Simula delay de rede
    setTimeout(() => {
      if (!searchQuery) {
        // Retorna todas as agências ou vazio - depende do seu caso
        const results = agenciasMock.map(ag => ({
          value: ag.id,
          label: `${ag.nome} (${ag.cidade})`
        }));
        resolve(results);
      } else {
        const query = searchQuery.toLowerCase();
        const filtered = agenciasMock
            .filter(ag =>
                ag.nome.toLowerCase().includes(query) ||
                ag.cidade.toLowerCase().includes(query)
            )
            .map(ag => ({
              value: ag.id,
              label: `${ag.nome} (${ag.cidade})`
            }));

        resolve(filtered);
      }
    }, 300); // Simula delay de rede
  });
}
</script> 