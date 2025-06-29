<template>
  <!-- Apelido/Nome Profissional -->
  <TextInput
      id="apelido"
      label="Apelido/Nome Profissional"
      v-model="modelValue.apelido"
      name="apelido"
      placeholder="Como você é conhecido pelos turistas"
      :error="storeErrors?.apelido"
      :error-message="storeErrors?.apelido?.[0]"
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
      mask="(##) #####-####"
      :error="storeErrors?.whatsapp"
      :error-message="storeErrors?.whatsapp?.[0]"
      :required="required"
      :readonly="readonly"
      :disabled="disabled"
  >
    <template #icon>
      <i class="fab fa-whatsapp text-green-500"></i>
    </template>
  </TextInput>

  <!-- Email de Contato -->
  <TextInput
      id="email_contato"
      label="Email de Contato"
      type="email"
      v-model="modelValue.email_contato"
      name="email_contato"
      placeholder="seu@email.com"
      :error="storeErrors?.email_contato"
      :error-message="storeErrors?.email_contato?.[0]"
      :required="required"
      :readonly="readonly"
      :disabled="disabled"
  />

  <!-- Data de Nascimento -->
  <div>
    <label for="data_nascimento" class="block text-sm font-medium text-gray-700">
      Data de Nascimento <span v-if="required" class="text-red-500">*</span>
    </label>
    <div class="mt-1 relative rounded-md shadow-sm">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <i class="fas fa-calendar text-gray-400"></i>
      </div>
      <input
          id="data_nascimento"
          type="date"
          v-model="modelValue.data_nascimento"
          name="data_nascimento"
          :required="required"
          :readonly="readonly"
          :disabled="disabled"
          :max="maxDate"
          class="py-2 pl-10 pr-10 block w-full border rounded-md focus:ring-2 focus:ring-offset-0 transition-colors"
          :class="dateInputClasses"
      />
      <!-- Indicador de idade -->
      <div v-if="calculatedAge && modelValue.data_nascimento" class="absolute inset-y-0 right-0 pr-3 flex items-center">
        <span 
          class="text-xs font-medium px-2 py-1 rounded"
          :class="ageIndicatorClass"
        >
          {{ calculatedAge }} anos
        </span>
      </div>
    </div>
    
    <!-- Validação de idade -->
    <div v-if="modelValue.data_nascimento && !isValidAge" class="text-red-600 text-sm mt-1.5 flex items-center">
      <i class="fas fa-exclamation-triangle mr-1"></i>
      Guias de turismo devem ter pelo menos 18 anos
    </div>
    
    <div v-if="storeErrors?.data_nascimento" class="text-red-600 text-sm mt-1.5">
      {{ storeErrors.data_nascimento[0] }}
    </div>
  </div>

  <!-- CADASTUR -->
  <TextInput
      id="cadastur"
      label="CADASTUR (Registro de Guia)"
      v-model="modelValue.cadastur"
      name="cadastur"
      placeholder="Número do seu registro CADASTUR"
      :error="storeErrors?.cadastur"
      :error-message="storeErrors?.cadastur?.[0]"
      :required="false"
      :readonly="readonly"
      :disabled="disabled"
  >
    <template #help>
      <p class="text-xs text-gray-500 mt-1">
        <i class="fas fa-info-circle mr-1"></i>
        Registro obrigatório para guias profissionais. Deixe em branco se ainda não possui.
      </p>
    </template>
  </TextInput>

  <!-- Abrangência de Atuação -->
  <div>
    <label for="abrangencia_id" class="block text-sm font-medium text-gray-700">
      Abrangência de Atuação <span v-if="required" class="text-red-500">*</span>
    </label>
    <div class="mt-1 relative rounded-md shadow-sm">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <i class="fas fa-map-marked-alt text-gray-400"></i>
      </div>
      <select
          id="abrangencia_id"
          v-model="modelValue.abrangencia_id"
          name="abrangencia_id"
          :required="required"
          :disabled="disabled || readonly"
          class="py-2 pl-10 block w-full border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
          :class="{'border-red-400': storeErrors?.abrangencia_id, 'border-gray-300': !storeErrors?.abrangencia_id}"
      >
        <option value="" disabled>Selecione sua área de atuação</option>
        <option value="1">Local (Cidade específica)</option>
        <option value="2">Regional (Estado/Região)</option>
        <option value="3">Nacional (Todo o Brasil)</option>
        <option value="4">Internacional (Outros países)</option>
        <option value="5">Especializado em Ecoturismo</option>
        <option value="6">Especializado em Turismo Cultural</option>
        <option value="7">Especializado em Turismo de Aventura</option>
        <option value="8">Especializado em Turismo Religioso</option>
        <option value="9">Especializado em Turismo Gastronômico</option>
        <option value="10">Especializado em Turismo Rural</option>
        <option value="11">Guia de Cidade</option>
        <option value="12">Guia de Museus e Monumentos</option>
        <option value="13">Guia de Natureza</option>
        <option value="14">Guia Especializado em Grupos</option>
        <option value="15">Guia Bilíngue/Multilíngue</option>
      </select>
    </div>
    <div v-if="storeErrors?.abrangencia_id" class="text-red-600 text-sm mt-1.5">
      {{ storeErrors.abrangencia_id[0] }}
    </div>
    <div class="text-xs text-gray-500 mt-1">
      <i class="fas fa-lightbulb mr-1"></i>
      Escolha a opção que melhor descreve sua área de especialização
    </div>
  </div>

  <!-- Informações Adicionais -->
  <div v-if="showAdditionalInfo" class="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
    <h4 class="font-medium text-blue-900 mb-2 flex items-center">
      <i class="fas fa-user-tie mr-2"></i>
      Informações do Guia
    </h4>
    <div class="text-sm text-blue-800 space-y-1">
      <div v-if="modelValue.apelido">
        <strong>Nome Profissional:</strong> {{ modelValue.apelido }}
      </div>
      <div v-if="calculatedAge">
        <strong>Idade:</strong> {{ calculatedAge }} anos
      </div>
      <div v-if="selectedAbrangencia">
        <strong>Área de Atuação:</strong> {{ selectedAbrangencia }}
      </div>
      <div v-if="modelValue.cadastur">
        <strong>CADASTUR:</strong> {{ modelValue.cadastur }}
      </div>
    </div>
  </div>
</template>

<script setup>
import TextInput from "@/components/formulario/TextInput.vue";
import { computed } from "vue";
import { useGuiaTurismoStore } from "@/stores/perfil/guiaTurismo.store.js";

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
    default: () => ({
      apelido: '',
      whatsapp: '',
      email_contato: '',
      data_nascimento: '',
      cadastur: '',
      abrangencia_id: ''
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

const store = useGuiaTurismoStore();

// Computed para os erros da store
const storeErrors = computed(() => store.errors);

// Data máxima (hoje)
const maxDate = computed(() => {
  const today = new Date();
  return today.toISOString().split('T')[0];
});

// Idade calculada
const calculatedAge = computed(() => {
  if (!props.modelValue.data_nascimento) return null;
  return store.calculateAge(props.modelValue.data_nascimento);
});

// Validação de idade
const isValidAge = computed(() => {
  if (!props.modelValue.data_nascimento) return true;
  return store.validateAge(props.modelValue.data_nascimento);
});

// Classes do input de data
const dateInputClasses = computed(() => {
  if (storeErrors.value?.data_nascimento || !isValidAge.value) {
    return 'border-red-400 focus:ring-red-500 focus:border-red-500';
  }
  if (props.modelValue.data_nascimento && isValidAge.value) {
    return 'border-green-400 focus:ring-green-500 focus:border-green-500';
  }
  return 'border-gray-300 focus:ring-blue-500 focus:border-blue-500';
});

// Classes do indicador de idade
const ageIndicatorClass = computed(() => {
  if (!calculatedAge.value) return '';
  if (isValidAge.value) {
    return 'bg-green-100 text-green-800';
  }
  return 'bg-red-100 text-red-800';
});

// Abrangência selecionada (para display)
const selectedAbrangencia = computed(() => {
  if (!props.modelValue.abrangencia_id) return '';
  
  const abrangencias = {
    '1': 'Local (Cidade específica)',
    '2': 'Regional (Estado/Região)',
    '3': 'Nacional (Todo o Brasil)',
    '4': 'Internacional (Outros países)',
    '5': 'Especializado em Ecoturismo',
    '6': 'Especializado em Turismo Cultural',
    '7': 'Especializado em Turismo de Aventura',
    '8': 'Especializado em Turismo Religioso',
    '9': 'Especializado em Turismo Gastronômico',
    '10': 'Especializado em Turismo Rural',
    '11': 'Guia de Cidade',
    '12': 'Guia de Museus e Monumentos',
    '13': 'Guia de Natureza',
    '14': 'Guia Especializado em Grupos',
    '15': 'Guia Bilíngue/Multilíngue'
  };
  
  return abrangencias[props.modelValue.abrangencia_id] || '';
});

// Mostrar informações adicionais
const showAdditionalInfo = computed(() => {
  return props.modelValue.apelido || 
         props.modelValue.data_nascimento || 
         props.modelValue.abrangencia_id || 
         props.modelValue.cadastur;
});
</script>

<style scoped>
/* Animações específicas */
.transition-colors {
  transition-property: color, background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Estados do input de data */
input[type="date"]::-webkit-calendar-picker-indicator {
  opacity: 0.6;
  cursor: pointer;
}

input[type="date"]::-webkit-calendar-picker-indicator:hover {
  opacity: 1;
}

/* WhatsApp icon color */
.fab.fa-whatsapp {
  color: #25D366;
}
</style> 