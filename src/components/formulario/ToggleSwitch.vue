<template>
  <div>
    <label :for="id" class="block text-sm font-medium" :class="viewMode ? 'text-gray-500' : 'text-gray-700'">
      {{ label }} <span v-if="required" class="text-red-500">*</span>
    </label>

    <div class="mt-1">
      <div v-if="viewMode" class="py-2 block w-full pl-3 text-gray-900">
        {{ displayValue }}
      </div>

      <div v-else class="flex items-center">
        <label :for="id" class="flex items-center cursor-pointer">
          <!-- Toggle Switch Container -->
          <div class="relative">
            <!-- Hidden Checkbox -->
            <input
                :id="id"
                type="checkbox"
                class="sr-only"
                v-model="toggleValue"
                :name="name"
                :disabled="disabled"
                :readonly="readonly"
                :required="required"
            />
            <!-- Track -->
            <div
                class="block w-14 h-8 rounded-full transition-colors duration-300 ease-in-out"
                :class="{
                'bg-gray-300': !toggleValue,
                'bg-primary': toggleValue,
                'opacity-50 cursor-not-allowed': disabled || readonly,
                'border-red-400': error
              }"
            ></div>
            <!-- Thumb with Labels -->
            <div
                class="absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 ease-in-out flex items-center justify-center text-xs font-medium p-2"
                :class="{
                'transform translate-x-6': toggleValue,
                'text-gray-700': !toggleValue,
                'text-primary': toggleValue,
                'cursor-not-allowed': disabled || readonly
              }"
            >
              {{ toggleValue ? 'Sim' : 'Não' }}
            </div>
          </div>
          <!-- Optional Label Text -->
          <span v-if="$slots.default" class="ml-3 text-sm text-gray-700">
            <slot></slot>
          </span>
        </label>
      </div>
    </div>

    <div v-if="error && errorMessage && !viewMode" class="text-red-600 text-sm mt-1.5">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToggleSwitch',
  props: {
    id: { type: String, required: true },
    label: { type: String, required: true },
    modelValue: { type: Boolean, default: false },
    name: { type: String, default: '' },
    required: { type: Boolean, default: false },
    error: { type: Boolean, default: false },
    errorMessage: { type: String, default: '' },
    readonly: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    viewMode: { type: Boolean, default: false }
  },
  emits: ['update:modelValue'],
  computed: {
    toggleValue: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    },
    displayValue() {
      return this.modelValue ? 'Sim' : 'Não'
    }
  }
}
</script>

<style scoped>
.transition-transform {
  transition-property: transform;
}
</style>