<template>
  <AsyncSelectInput
      :modelValue="modelValue"
      @update:modelValue="$emit('update:modelValue', $event)"
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
      :minSearchLength="1"
      :has-custom-message="true"
      :custom-message="!uf ? 'Selecione um estado primeiro' : null"
  />
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
    }
  },
  emits: ['update:modelValue'],
  watch: {
    uf(newUF, oldUF) {
      // Limpa o valor selecionado quando muda a UF
      if (newUF !== oldUF && this.modelValue) {
        this.$emit('update:modelValue', '');
      }
    }
  },
  methods: {
    async buscarCidadesFiltradas(searchQuery) {
      // Se não tem UF selecionada, retorna vazio
      if (!this.uf) return [];

      // Busca cidades da UF filtradas pelo nome
      return await buscarCidades(this.uf, searchQuery);
    }
  }
};
</script>