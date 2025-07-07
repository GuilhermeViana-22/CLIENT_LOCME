<template>
  <div>
    <!-- Modo visualização (somente leitura) -->
    <template v-if="viewMode">
      <label :for="id" class="block text-sm font-medium text-gray-700">
        {{ label }} <span v-if="required" class="text-red-500">*</span>
      </label>
      <div class="mt-1 p-2 bg-gray-100 rounded-md min-h-[42px]">
        {{ displayValue || 'Nenhuma cidade selecionada' }}
      </div>
    </template>

    <!-- Modo edição -->
    <template v-else>
      <AsyncSelectInput
          :modelValue="modelValue"
          @update:modelValue="handleUpdate"
          :id="id"
          :name="name"
          :label="label"
          :placeholder="!uf ? 'Selecione um estado primeiro' : (placeholder || 'Digite o nome da cidade...')"
          :required="required"
          :disabled="disabled || !uf"
          :readonly="readonly"
          :error="error"
          :error-message="errorMessage"
          :fetchOptions="buscarCidadesFiltradas"
          :debounceTime="300"
          :minSearchLength="3"
          :has-custom-message="true"
          :custom-message="!uf ? 'Selecione um estado primeiro' : null"
      />
    </template>
  </div>
</template>

<script>
import AsyncSelectInput from './AsyncSelectInput.vue';
import { buscarCidades } from '@/services/utils/cidadesService.js';

export default {
  name: 'CidadeSelect',
  components: { AsyncSelectInput },
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    uf: {
      type: String,
      default: '',
      validator: value => value === '' || value.length === 2
    },
    id: {
      type: String,
      default: 'cidade'
    },
    name: {
      type: String,
      default: 'cidade'
    },
    label: {
      type: String,
      default: 'Cidade'
    },
    placeholder: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    errorMessage: {
      type: String,
      default: ''
    },
    viewMode: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      displayValue: '',
      cachedOptions: []
    };
  },
  watch: {
    uf(newUF, oldUF) {
      if (newUF !== oldUF) {
        this.handleUFChange();
      }
    },
    modelValue(newVal) {
      if (newVal) {
        this.updateDisplayValue();
      } else {
        this.displayValue = '';
      }
    }
  },
  mounted() {
    if (this.modelValue) {
      this.updateDisplayValue();
    }
  },
  methods: {
    async handleUFChange() {
      // Limpa o valor quando muda a UF
      if (this.modelValue) {
        this.$emit('update:modelValue', '');
      }

      // Carrega cidades da nova UF se já tiver um valor
      if (this.modelValue && this.uf) {
        await this.updateDisplayValue();
      }
    },

    async updateDisplayValue() {
      if (!this.modelValue || !this.uf) {
        this.displayValue = '';
        return;
      }

      try {
        // Busca cidades da UF (usa cache)
        const cidades = await buscarCidades(this.uf);

        // Encontra a cidade selecionada
        const cidadeSelecionada = cidades.find(c => c.value === this.modelValue);

        if (cidadeSelecionada) {
          this.displayValue = cidadeSelecionada.label;
          this.cachedOptions = cidades;
        } else {
          this.displayValue = this.modelValue; // Mostra o valor bruto se não encontrar
        }
      } catch (error) {
        console.error('Erro ao buscar cidade:', error);
        this.displayValue = this.modelValue; // Fallback para o valor bruto
      }
    },

    handleUpdate(value) {
      this.$emit('update:modelValue', value);

      // Atualiza o displayValue imediatamente se estiver no cache
      const cidade = this.cachedOptions.find(c => c.value === value);
      if (cidade) {
        this.displayValue = cidade.label;
      }
    },

    async buscarCidadesFiltradas(searchQuery) {
      if (!this.uf) return [];

      // Se tem valor mas não tem busca, retorna o valor atual + opções
      if (this.modelValue && !searchQuery) {
        const cidades = await buscarCidades(this.uf);
        this.cachedOptions = cidades;

        // Garante que o valor atual está na lista
        if (this.modelValue && !cidades.some(c => c.value === this.modelValue)) {
          return [{ value: this.modelValue, label: this.displayValue || this.modelValue }, ...cidades];
        }
        return cidades;
      }

      // Busca normal
      const cidades = await buscarCidades(this.uf, searchQuery);
      this.cachedOptions = cidades;
      return cidades;
    }
  }
};
</script>