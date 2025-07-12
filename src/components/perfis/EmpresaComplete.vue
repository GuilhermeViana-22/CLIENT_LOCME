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
          <div class="grid lg:grid-cols-2 grid-cols-1 gap-4">
          <!-- Dados do Usuário -->
          <!-- Apelido -->
          <TextInput
              id="apelido"
              label="Apelido"
              v-model="form.apelido"
              name="apelido"
              placeholder="Seu apelido"
              icon="fas fa-user text-gray-400"
              readonly
          />

          <!-- Email -->
          <TextInput
              id="email"
              label="E-mail"
              v-model="form.email"
              name="email"
              type="email"
              autocomplete="email"
              placeholder="seu@email.com"
              icon="fas fa-envelope text-gray-400"
              readonly
          />
        </div>

        <Line
            variant="text-center"
            color="border-gray-200"
            textColor="text-gray-700"
            spacing="my-8"
            text="Dados cadastrais"
        />

          <empresa_form 
            v-model="form"
            :required="true"
          />

          <Line
              variant="text-center"
              color="border-gray-200"
              textColor="text-gray-700"
              spacing="my-8"
          />

          <div class="w-full md:w-50 md:float-right">
            <ButtonSubmit
                :loading="store.isLoading"
                label="Finalizar"
                custom-class="bg-accent"
            />
          </div>

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
import TextInput from "@/components/formulario/TextInput.vue";
import Line from "@/components/utils/Line.vue";
import {usePerfilStore} from "@/stores/perfil/perfil.store.js";
import ButtonSubmit from "@/components/formulario/ButtonSubmit.vue";

const store = useEmpresaStore();
const perfilStore = usePerfilStore();
const authStore = useAuthStore();

const form = ref({
  apelido: authStore.user?.name,
  email: authStore.user?.email,

  nome_empresa: '',
  telefone: '',
  email_contato: '',
  url: '',
  cadastur: '',
  condicoes_especiais: false,
  condicoes: '',

  atividades: [1, 3],
  unidades_localidades: '',
  produtos_servicos: '',
  nome_cadastro: '',
  cargo_cadastro: '',

  endereco: {  // Todos campos de endereço movidos para aqui
    endereco: '',
    cidade: '',
    estado: '',
    cep: '',
    pais: 'Brasil',
  },
});

async function submit() {
  try {
    await perfilStore.submitCompletarPerfil(form.value, store);
  } catch (error) {
    console.error('Erro no cadastro:', error);
  }
}
</script>
