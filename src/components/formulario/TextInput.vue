<template>
  <div>
    <label :for="id" class="block text-sm font-medium" :class="viewMode ? 'text-gray-500' : 'text-gray-700'">
      {{ label }} <span v-if="required" class="text-red-500">*</span>
    </label>
    <div class="mt-1 relative rounded-md shadow-sm">
      <div v-if="icon" class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <i :class="icon"></i>
      </div>
      <input
          v-if="!viewMode"
          :id="id"
          :value="modelValue"
          :name="name"
          :type="type"
          :autocomplete="autocomplete"
          :required="required"
          :readonly="readonly"
          :disabled="disabled"

          :maxlength="mask === '#####-###' ? 9 : null"

          class="py-2 block w-full border rounded-md focus:ring-primary focus:border-primary"
          :class="[ icon ? 'pl-10' : 'pl-3', {
            'border-red-400': error && !viewMode,
            'border-gray-300': !error && !viewMode,
            'bg-gray-200 cursor-not-allowed': readonly || disabled,
          }]"
          :placeholder="placeholder"
          @input="handleInput"
      />

      <div v-else class="py-2 block w-full pl-3 text-gray-900">
        {{ modelValue || '—' }}
      </div>
    </div>
    <div v-if="error && errorMessage && !viewMode" class="text-red-600 text-sm mt-1.5">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextInput',
  props: {
    id: { type: String, required: true },
    type: { type: String, default: 'text' },
    label: { type: String, required: true },
    modelValue: { type: [String, Number], default: '' },
    name: { type: String, default: '' },
    autocomplete: { type: String, default: 'off' },
    required: { type: Boolean, default: false },
    placeholder: { type: String, default: '' },
    error: { type: Boolean, default: false },
    errorMessage: { type: String, default: '' },
    icon: { type: String, default: '' },
    readonly: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    viewMode: { type: Boolean, default: false },
    mask: { type: String, default: null } // <- adicionada
  },
  emits: ['update:modelValue'],
  methods: {
    applyMask(value) {
      if (this.mask === '#####-###') {
        const digits = value.replace(/\D/g, '').slice(0, 8);  // limita a 8 números
        return digits.replace(/^(\d{5})(\d)/, '$1-$2');       // formata como CEP
      }
      return value;
    },
    handleInput(event) {
      const rawValue = event.target.value;
      const masked = this.applyMask(rawValue);
      this.$emit('update:modelValue', masked);
    }
  }
}
</script>
