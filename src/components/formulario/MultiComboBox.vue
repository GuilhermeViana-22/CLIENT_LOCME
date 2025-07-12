<template>
  <div>
    <div v-if="viewMode" class="view-mode">
      <p class="text-sm text-gray-700">{{ label }}</p>
      <p class="font-medium">{{ displayValue || 'Não informado' }}</p>
    </div>

    <template v-else>
      <label :for="id" class="block text-sm font-medium text-gray-700">
        {{ label }} <span v-if="required" class="text-red-500">*</span>
      </label>

      <div class="mt-1 relative" @click="focusInput">
        <!-- Container dos itens selecionados -->
        <div
            class="flex flex-wrap gap-2 py-2 px-3 w-full border border-gray-300 rounded-md focus:ring-primary focus:border-primary min-h-[42px]"
            :class="{
            'border-red-400': error,
            'border-gray-300': !error,
            'bg-gray-100': disabled || readonly
          }"
        >
          <!-- Tags dos itens selecionados -->
          <span
              v-for="(item, index) in selectedItems"
              :key="index"
              class="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
          >
            {{ getItemLabel(item) }}
            <button
                type="button"
                @click.stop="removeItem(index)"
                class="ml-1 text-blue-500 hover:text-blue-700"
                :disabled="disabled || readonly"
            >
              &times;
            </button>
          </span>

          <!-- Input para busca -->
          <input
              ref="input"
              v-model="searchQuery"
              @keydown="handleKeyDown"
              @blur="onBlur"
              @focus="onFocus"
              :id="id"
              :name="name"
              :disabled="disabled || readonly"
              :placeholder="selectedItems.length === 0 ? placeholder : ''"
              class="flex-grow outline-none min-w-[50px] bg-transparent"
          />
        </div>

        <!-- Dropdown de opções - Ajustado o estilo aqui -->
        <div
            v-if="isOpen && filteredOptions.length > 0"
            class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none"
        >
          <div
              v-for="(option, index) in filteredOptions"
              :key="index"
              @click="toggleOption(option)"
              class="cursor-pointer select-none relative py-2 pl-3 pr-9"
              :class="{
              'bg-blue-50 text-gray-900': isSelected(getItemValue(option)),
              'text-gray-700 hover:bg-gray-100': !isSelected(getItemValue(option)),
              'text-gray-400': option.disabled
            }"
          >
            <span class="block truncate">
              {{ getItemLabel(option) }}
            </span>
            <span
                v-if="isSelected(getItemValue(option))"
                class="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600"
            >
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </span>
          </div>
        </div>

        <!-- Ícone do dropdown -->
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
          </svg>
        </div>
      </div>

      <div v-if="error" class="text-red-600 text-sm mt-1.5">
        {{ errorMessage }}
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'MultiComboBox',
  props: {
    modelValue: {
      type: Array,
      default: () => []
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
      default: 'Selecione...'
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
    },
    options: {
      type: Array,
      default: () => []
    },
    optionLabel: {
      type: String,
      default: 'label'
    },
    optionValue: {
      type: String,
      default: 'value'
    }
  },
  emits: ['update:modelValue', 'focus', 'blur'],
  data() {
    return {
      isOpen: false,
      searchQuery: '',
      hasFocus: false
    }
  },
  computed: {
    displayValue() {
      if (!this.modelValue.length) return ''

      return this.selectedItems.map(item => this.getItemLabel(item)).join(', ')
    },
    selectedItems() {
      return this.options.filter(option =>
          this.modelValue.includes(option[this.optionValue])
      )
    },
    filteredOptions() {
      if (!this.searchQuery) return this.options

      const query = this.searchQuery.toLowerCase()
      return this.options.filter(option =>
          this.getItemLabel(option).toLowerCase().includes(query)
      )
    }
  },
  methods: {
    getItemLabel(item) {
      return item[this.optionLabel] || item.label || item.value
    },
    getItemValue(item) {
      return item[this.optionValue] || item.value || item.label
    },
    isSelected(value) {
      return this.modelValue.includes(value)
    },
    toggleOption(option) {
      const value = option[this.optionValue]
      let newValue = [...this.modelValue]

      if (this.isSelected(value)) {
        newValue = newValue.filter(v => v !== value)
      } else {
        newValue.push(value)
      }

      this.$emit('update:modelValue', newValue)
      this.searchQuery = ''
      this.$nextTick(() => this.$refs.input.focus())
    },
    removeItem(index) {
      const newValue = [...this.modelValue]
      newValue.splice(index, 1)
      this.$emit('update:modelValue', newValue)
    },
    focusInput() {
      if (this.disabled || this.readonly) return
      this.$refs.input.focus()
      this.isOpen = true
    },
    onFocus() {
      this.hasFocus = true
      this.isOpen = true
      this.$emit('focus')
    },
    onBlur() {
      setTimeout(() => {
        this.hasFocus = false
        this.isOpen = false
        this.$emit('blur')
      }, 200)
    },
    handleKeyDown(e) {
      // Fechar ao pressionar Escape
      if (e.key === 'Escape') {
        this.isOpen = false
        this.$refs.input.blur()
      }
      // Abrir ao pressionar ArrowDown
      else if (e.key === 'ArrowDown' && !this.isOpen) {
        this.isOpen = true
      }
    }
  }
}
</script>