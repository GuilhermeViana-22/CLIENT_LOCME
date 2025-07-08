<template>
  <div>
    <!-- Modo visualização -->
    <div v-if="viewMode" class="view-mode">
      <p class="text-sm text-gray-700">{{ label }}</p>
      <p class="font-medium">{{ displayValue }}</p>
    </div>

    <!-- Modo edição -->
    <template v-else>
      <label :for="id" class="block text-sm font-medium text-gray-700">
        {{ label }} <span v-if="required" class="text-red-500">*</span>
      </label>

      <div class="mt-1">
        <div class="flex items-center">
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
                {{ toggleValue ? 'sim' : 'não' }}
              </div>
            </div>
            <!-- Optional Label Text -->
            <span v-if="$slots.default" class="ml-3 text-sm text-gray-700">
              <slot></slot>
            </span>
          </label>
        </div>
      </div>

      <div v-if="error && errorMessage" class="text-red-600 text-sm mt-1.5">
        {{ errorMessage }}
      </div>
    </template>
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
      if(this.modelValue === ''){
        return 'Não informado'
      }
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