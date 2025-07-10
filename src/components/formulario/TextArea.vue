<template>
  <div>
    <div v-if="viewMode">
      <p class="text-sm text-gray-700">{{ label }}</p>
      <div class="font-medium mt-1 whitespace-pre-wrap">
        <template v-if="!modelValue">
          Não informado
        </template>
        <template v-else>
          <!-- Renderiza texto com links clicáveis de forma segura -->
          <span v-for="(part, index) in splitTextWithLinks" :key="index">
            <template v-if="isUrl(part)">
              <button
                  @click="confirmNavigate(part)"
                  class="bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm text-center h-5 items-center align-middle"
              >
                Ir para link
              </button>
            </template>
            <template v-else>
              {{ part }}
            </template>
          </span>
        </template>
      </div>
    </div>

    <template v-else>
      <label :for="id" class="block text-sm font-medium text-gray-700">
        {{ label }} <span v-if="required" class="text-red-500">*</span>
      </label>
      <div class="mt-1 relative rounded-md shadow-sm">
        <textarea
            :id="id"
            :value="modelValue"
            :name="name"
            :rows="rows"
            :required="required"
            :readonly="readonly"
            :disabled="disabled"
            class="py-2 px-3 block w-full border rounded-md focus:ring-primary focus:border-primary"
            :class="{
            'border-red-400': error,
            'border-gray-300': !error,
            'bg-gray-200 cursor-not-allowed': readonly || disabled,
          }"
            :placeholder="placeholder"
            @input="handleInput"
        ></textarea>
      </div>
      <div v-if="error && errorMessage" class="text-red-600 text-sm mt-1.5">
        {{ errorMessage }}
      </div>
    </template>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: 'TextArea',
  props: {
    id: { type: String, required: true },
    label: { type: String, required: true },
    modelValue: { type: String, default: '' },
    name: { type: String, default: '' },
    rows: { type: Number, default: 4 },
    required: { type: Boolean, default: false },
    placeholder: { type: String, default: '' },
    error: { type: Boolean, default: false },
    errorMessage: { type: String, default: '' },
    readonly: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    viewMode: { type: Boolean, default: false }
  },
  emits: ['update:modelValue'],
  computed: {
    splitTextWithLinks() {
      if (!this.modelValue) return [];
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      return this.modelValue.split(urlRegex);
    }
  },
  methods: {
    handleInput(event) {
      this.$emit('update:modelValue', event.target.value);
    },
    isUrl(text) {
      return text.match(/^https?:\/\/[^\s]+$/);
    },
    confirmNavigate(url) {
      Swal.fire({
        title: 'Atenção',
        text: `Tem certeza que deseja ir para o link: ${url}?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sim, ir para o link',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          window.open(url, '_blank');
        }
      });
    }
  }
}
</script>