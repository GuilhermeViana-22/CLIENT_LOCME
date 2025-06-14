<template>
  <input
      :id="id"
      v-mask="dynamicMask"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :name="name"
      :type="type"
      :autocomplete="autocomplete"
      :required="required"
      :placeholder="placeholder"
      :class="inputClass"
  />
</template>

<script>
import { mask } from 'vue-the-mask'

export default {
  name: 'CpfInput',
  directives: { mask },
  props: {
    modelValue: { // Necessário para v-model
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: 'cpf'
    },
    name: {
      type: String,
      default: 'cpf'
    },
    type: {
      type: String,
      default: 'text'
    },
    autocomplete: {
      type: String,
      default: 'off'
    },
    required: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '000.000.000-00'
    },
    mask: {
      type: [String, Array],
      default: '###.###.###-##'
    },
    inputClass: {
      type: [String, Object],
      default: ''
    }
  },
  computed: {
    dynamicMask() {
      // Se for array, retorna a máscara mais longa que se encaixa no valor atual
      if (Array.isArray(this.mask)) {
        return this.mask.sort((a, b) => b.length - a.length)
            .find(mask => !this.modelValue || this.modelValue.length <= mask.length) || this.mask[0]
      }
      return this.mask
    }
  }
}
</script>