<template>
  <div class="min-h-screen bg-gray-50 py-6">
    <div class="container mx-auto px-4 lg:px-8">
      <!-- Cabeçalho -->
      <div class="bg-white p-6 shadow rounded-lg mb-6">
        <h2 class="text-xl font-bold text-primary">Complete seu perfil de Empresa</h2>
        <p class="text-gray-600">Insira as informações para terminar o cadastro.</p>
      </div>

      <!-- Grid Principal -->
      <form @submit.prevent="submit" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Avatar -->
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <InfoAlert type="info" class="mb-4">
            Selecione uma foto para a empresa clicando no ícone.
          </InfoAlert>
          <div class="flex justify-center">
            <ProfileAvatarCompact 
              size="lg" 
              :user="authStore.user" 
              editable
            />
          </div>
        </div>

        <!-- Formulário (ocupa 2 colunas em telas grandes) -->
        <div class="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <empresa_form 
            v-model="formData"
            :required="true"
            :errors="errors"
            :loading="loading"
            @submit="submit"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth/auth.store';
import { useEmpresaStore } from '@/stores/perfil/empresa.store';
import ProfileAvatarCompact from '@/components/user/ProfileAvatarCompact.vue';
import empresa_form from '@/components/perfis/forms/empresa_form.vue';
import InfoAlert from '@/components/utils/InfoAlert.vue';

const authStore = useAuthStore();
const empresaStore = useEmpresaStore();

const loading = ref(false);
const formData = ref({
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

const errors = ref({});

async function submit() {
  loading.value = true;
  try {
    await empresaStore.submitForm(formData.value);
  } catch (error) {
    errors.value = error?.response?.data?.errors || {};
    console.error('Erro:', error);
  } finally {
    loading.value = false;
  }
}
</script>
