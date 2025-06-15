<template>

  <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div class="bg-white py-8 px-4 shadow-lg rounded-lg sm:px-10">

      <!-- Formulário do Representante -->
      <form class="space-y-6" @submit.prevent="submit">

        <!-- Nome -->
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">
            Apelido
          </label>
          <div class="mt-1 relative rounded-md shadow-sm">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i class="fas fa-user text-gray-400"></i>
            </div>
            <input
                id="apelido"
                v-model="form.apelido"
                name="apelido"
                type="text"
                autocomplete="apelido"
                required
                class="py-2 pl-10 block w-full border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                :class="{'border-red-400': store.errors.apelido, 'border-gray-300': !store.errors.apelido}"
                placeholder="Seu apelido"
            />
          </div>
          <div v-if="store.errors.apelido" class="text-red-600 text-sm mt-1.5">
            {{ store.errors.name[0] }}
          </div>
        </div>



        <!-- Botão de cadastro -->
        <div>
          <button type="submit"
                  :disabled="store.isLoading"
                  class="w-full cursor-pointer py-3.5 px-4 bg-primary text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.01] shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-md mt-2">
            <span v-if="!store.isLoading">Cadastrar</span>
            <span v-else class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processando...
              </span>
          </button>
        </div>

      </form>
    </div>
  </div>


</template>

<script setup>

import {useRepresentateStore} from "@/stores/perfil/representante.store.js";
import {usePerfilStore} from "@/stores/perfil/perfil.store.js";
import {ref} from "vue";

const store = useRepresentateStore()
const perfilStore = usePerfilStore()

const form = ref({
  apelido: '',
})

async function submit() {
  try {
    await perfilStore.submitCompletarPerfil(form.value, store)
  } catch (error) {
    console.error('Erro no cadastro:', error)
  }
}
</script>