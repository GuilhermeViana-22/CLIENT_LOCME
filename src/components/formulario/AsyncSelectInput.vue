<template>
  <div class="relative">
    <!-- Modo visualização -->
    <div v-if="viewMode" class="view-mode">
      <p class="text-sm text-gray-700">{{ label }}</p>
      <p class="font-medium">{{ displayValue || 'Não informado' }}</p>
    </div>

    <!-- Modo edição -->
    <template v-else>
      <label :for="id" class="block text-sm font-medium text-gray-700">
        {{ label }} <span v-if="required" class="text-red-500">*</span> <span class="text-red-500" v-if="hasCustomMessage"> {{customMessage}} </span>
      </label>

      <div class="mt-1 relative">
        <input
            :id="id"
            v-model="searchQuery"
            @input="handleInput"
            @focus="showOptions = true"
            @blur="handleBlur"
            :name="name"
            :required="required"
            :disabled="disabled || readonly"
            :placeholder="placeholder"
            class="py-2 px-3 block w-full border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
            :class="{
              'border-red-400': error,
              'border-gray-300': !error
            }"
        />

        <div v-if="isLoading" class="absolute inset-y-0 right-0 flex items-center pr-3">
          <svg class="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      </div>

      <ul v-if="showOptions && options.length > 0" class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
        <li
            v-for="option in options"
            :key="option.value"
            @mousedown="selectOption(option)"
            class="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
        >
          <span class="block truncate">{{ option.label }}</span>
          <span v-if="modelValue === option.value" class="text-primary absolute inset-y-0 right-0 flex items-center pr-4">
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </span>
        </li>
      </ul>

      <div v-if="error" class="text-red-600 text-sm mt-1.5">
        {{ errorMessage }}
      </div>
    </template>
  </div>
</template>

<script>
import { debounce } from 'lodash';

export default {
  name: 'AsyncSelectInput',
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Digite para pesquisar...'
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
    hasCustomMessage: {
      type: Boolean,
      default: false
    },
    customMessage: {
      type: String,
      default: ''
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
    },
    // Função que busca os dados (deve retornar uma Promise)
    fetchOptions: {
      type: Function,
      required: true
    },
    // Tempo de debounce para a pesquisa (ms)
    debounceTime: {
      type: Number,
      default: 300
    },
    // Valor mínimo de caracteres para disparar a pesquisa
    minSearchLength: {
      type: Number,
      default: 2
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      searchQuery: '',
      options: [],
      isLoading: false,
      showOptions: false,
      selectedOption: null
    };
  },
  computed: {
    displayValue() {
      return this.selectedOption?.label || this.searchQuery || '';
    }
  },
  created() {
    this.debouncedFetch = debounce(this.fetchData, this.debounceTime);

    // Se já houver um valor selecionado, buscar o label correspondente
    if (this.modelValue) {
      this.initializeSelectedValue();
    }
  },
  methods: {
    async initializeSelectedValue() {
      try {
        this.isLoading = true;
        // Supondo que a fetchOptions pode lidar com busca por ID quando searchQuery está vazio
        const options = await this.fetchOptions('', this.modelValue);
        const selected = options.find(opt => opt.value === this.modelValue);
        if (selected) {
          this.searchQuery = selected.label;
          this.selectedOption = selected;
        }
      } catch (error) {
        console.error('Error initializing selected value:', error);
      } finally {
        this.isLoading = false;
      }
    },
    handleInput() {
      if (this.searchQuery.length >= this.minSearchLength || this.searchQuery.length === 0) {
        this.debouncedFetch();
      } else {
        this.options = [];
      }
    },
    async fetchData() {
      if (this.isLoading) return;

      this.isLoading = true;
      try {
        this.options = await this.fetchOptions(this.searchQuery);
        this.showOptions = this.options.length > 0;
      } catch (error) {
        console.error('Error fetching options:', error);
        this.options = [];
      } finally {
        this.isLoading = false;
      }
    },
    selectOption(option) {
      this.selectedOption = option;
      this.searchQuery = option.label;
      this.$emit('update:modelValue', option.value);
      this.showOptions = false;
    },
    handleBlur() {
      // Pequeno delay para permitir a seleção de uma opção antes de fechar
      setTimeout(() => {
        this.showOptions = false;

        // Se não houver opção selecionada ou o texto não corresponder, limpar
        if (!this.selectedOption || this.selectedOption.label !== this.searchQuery) {
          this.searchQuery = '';
          this.$emit('update:modelValue', '');
        } else {
          // Garantir que o texto mostrado corresponde à opção selecionada
          this.searchQuery = this.selectedOption.label;
        }
      }, 200);
    }
  },
  watch: {
    modelValue(newVal) {
      if (!newVal) {
        this.searchQuery = '';
        this.selectedOption = null;
      } else if (newVal !== this.selectedOption?.value) {
        this.initializeSelectedValue();
      }
    }
  }
};
</script>