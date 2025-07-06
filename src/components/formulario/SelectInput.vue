<template>
  <div>
    <label :for="id" class="block text-sm font-medium text-gray-700">
      {{ label }} <span v-if="required" class="text-red-500">*</span>
    </label>
    <div class="mt-1">
      <select
          :id="id"
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          :name="name"
          :required="required"
          :disabled="disabled || readonly"
          class="py-2 px-3 block w-full border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
          :class="{
            'border-red-400': error,
            'border-gray-300': !error
          }"
      >
        <option value="" disabled>{{ placeholder }}</option>
        <slot></slot>
      </select>
    </div>
    <div v-if="error" class="text-red-600 text-sm mt-1.5">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectInput',
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
  emits: ['update:modelValue']
}
</script>