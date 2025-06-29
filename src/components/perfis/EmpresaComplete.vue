<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="container mx-auto px-4">
      <!-- Header Section -->
      <div class="bg-white px-6 py-4 shadow rounded-lg md:bg-transparent md:shadow-none">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-2xl font-bold text-primary">Complete seu perfil de Empresa</h2>
          <h4 class="text-gray-600 mt-2">Insira as informações para terminar o cadastro da empresa.</h4>
        </div>
      </div>

      <!-- Main Form Container -->
      <div class="mt-6 bg-white shadow-xl rounded-lg overflow-hidden">
        <form class="grid grid-cols-1 md:grid-cols-12 gap-0" @submit.prevent="submit">
          <!-- Left Column (Avatar Section) -->
          <div class="md:col-span-4 p-8 bg-gray-50 border-r border-gray-200">
            <div class="space-y-6">
              <InfoAlert type="info" :dismissible="false">
                Selecione uma foto para a empresa clicando sobre o ícone abaixo.
              </InfoAlert>
              
              <div class="flex justify-center">
                <ProfileAvatarCompact 
                  size="xl" 
                  :user="authStore.user" 
                  editable 
                  class="ring-4 ring-white shadow-lg"
                />
              </div>
              
              <div class="hidden md:block mt-12 text-center">
                <p class="text-sm text-gray-500">
                  A imagem deve ser quadrada e ter no mínimo 300x300 pixels.
                  Formatos aceitos: JPG, PNG.
                </p>
              </div>
            </div>
          </div>

          <!-- Right Column (Form Section) -->
          <div class="md:col-span-8 p-8">
            <div class="max-w-2xl mx-auto">
              <!-- Form Grid -->
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <empresa_form v-model="form" :required="true" />
              </div>

              <!-- Divider -->
              <Line 
                variant="text-center" 
                color="border-gray-200" 
                textColor="text-gray-700" 
                spacing="my-8"
              />

              <!-- Submit Button -->
              <div class="flex justify-end">
                <div class="w-full md:w-64">
                  <ButtonSubmit 
                    :loading="store.isLoading" 
                    label="Finalizar Cadastro" 
                    class="w-full bg-accent hover:bg-accent-dark transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth/auth.store.js';
import { useEmpresaStore } from '@/stores/perfil/empresa.store.js';
import ProfileAvatarCompact from '@/components/user/ProfileAvatarCompact.vue';
import empresa_form from '@/components/perfis/forms/empresa_form.vue';
import ButtonSubmit from '@/components/formulario/ButtonSubmit.vue';
import InfoAlert from '@/components/utils/InfoAlert.vue';
import Line from '@/components/utils/Line.vue';

const store = useEmpresaStore();
const authStore = useAuthStore();

const form = ref({
  nome_empresa: '',
  telefone: '',
  email_contato: '',
  url: '',
  cadastur: '',
  condicoes_especiais: false,
  condicoes: '',
  atividade_id: '',
  unidades_localidades: '',
  produtos_servicos: '',
  nome_cadastro: '',
  cargo_cadastro: '',
  endereco: '',
  cidade: '',
  estado: '',
  cep: '',
  pais: ''
});

async function submit() {
  try {
    await store.submitForm();
  } catch (error) {
    console.error('Erro no cadastro da empresa:', error);
  }
}
</script>