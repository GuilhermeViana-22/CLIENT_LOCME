<template>
  <div>
    <div v-if="viewMode">
      <p class="text-sm text-gray-700">{{ label }}</p>
      <template v-if="type === 'url' && modelValue">
        <button
            @click="confirmNavigate"
            class="mt-1 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
        >
          Ir para link
        </button>
      </template>
      <template v-else>
        <p class="font-medium">{{ formattedValue || 'Não informado' }}</p>
      </template>
    </div>

    <template v-else>
      <label :for="id" class="block text-sm font-medium text-gray-700">
        {{ label }} <span v-if="required" class="text-red-500">*</span>
      </label>
      <div class="mt-1 relative rounded-md shadow-sm">
        <div v-if="icon" class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <i :class="icon"></i>
        </div>
        <input
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
              'border-red-400': error,
              'border-gray-300': !error,
              'bg-gray-200 cursor-not-allowed': readonly || disabled,
            }]"
            :placeholder="placeholder"
            @input="handleInput"
        />
      </div>
      <div v-if="error && errorMessage" class="text-red-600 text-sm mt-1.5">
        {{ errorMessage }}
      </div>
    </template>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

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
    mask: { type: String, default: null }
  },
  emits: ['update:modelValue'],
  computed: {
    formattedValue() {
      if (!this.modelValue) return '—';

      if (this.type === 'date') {
        try {
          // Formata datas no formato ISO (2001-09-22T00:00:00.000000Z)
          const date = new Date(this.modelValue);
          return isNaN(date.getTime())
              ? this.modelValue
              : new Intl.DateTimeFormat('pt-BR').format(date);
        } catch {
          return this.modelValue;
        }
      }

      return this.modelValue || '—';
    }
  },
  methods: {
    applyMask(value) {
      if (this.mask === '#####-###') {
        const digits = value.replace(/\D/g, '').slice(0, 8);
        return digits.replace(/^(\d{5})(\d)/, '$1-$2');
      }
      return value;
    },
    handleInput(event) {
      const rawValue = event.target.value;
      const masked = this.applyMask(rawValue);
      this.$emit('update:modelValue', masked);
    },
    confirmNavigate() {
      Swal.fire({
        title: 'Atenção',
        text: `Tem certeza que deseja ir para o link: ${this.modelValue}?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sim, ir para o link',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          window.open(this.modelValue, '_blank');
        }
      });
    }
  }
}
</script>