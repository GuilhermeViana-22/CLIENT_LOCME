<template>
  <div class="mt-8 container mx-auto">

    <div class="bg-white px-4 py-2 md:py-0 md:px-0 md:bg-transparent shadow-lg rounded-lg md:shadow-none">
      <h2 class="text-xl font-semibold text-primary">Complete seu perfil</h2>
      <h4 class="font-semibold text-gray-500 mb-6">Insira as seguintes informações para terminar de realizar o cadastro.</h4>
    </div>

    <div class="bg-white py-8 px-4 shadow-lg rounded-lg sm:px-10 md:mt-0 mt-2">

      <!-- Formulário do Representante -->
      <form class="md:flex md:flex-row flex-col" @submit.prevent="submit">

        <section class="md:w-1/3 w-full">
          <div class="flex align-middle justify-center flex-col items-center md:px-4">

            <!-- Alerta simples -->
            <InfoAlert type="info" :dismissible="false" class="mb-6">
              Selecione uma foto para o seu usuário clicando sobre o ícone abaixo.
            </InfoAlert>

            <!-- FOTO DE PERFIL -->
            <ProfileAvatarCompact size="lg" :user="authStore.user" editable />
          </div>
        </section>

        <section class="md:w-2/3 w-full">
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

          <div class="grid lg:grid-cols-2 grid-cols-1 gap-4">

            <!-- Formulário -->
            <agencia_viagem_form
                v-model="form"
                :required="true"
            />
          </div>

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
        </section>
      </form>
    </div>
  </div>
</template>

<script setup>
import { usePerfilStore } from "@/stores/perfil/perfil.store.js";
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth/auth.store.js";
import ProfileAvatarCompact from "@/components/user/ProfileAvatarCompact.vue";
import TextInput from "@/components/formulario/TextInput.vue";
import ButtonSubmit from "@/components/formulario/ButtonSubmit.vue";
import InfoAlert from "@/components/utils/InfoAlert.vue";
import Line from "@/components/utils/Line.vue";
import {useAgenciaViagemStore} from "@/stores/perfil/agenciaViagem.store.js";
import Agencia_viagem_form from "@/components/perfis/forms/agencia_viagem_form.vue";

const store = useAgenciaViagemStore();
const perfilStore = usePerfilStore();
const authStore = useAuthStore();

const form = ref({
  apelido: authStore.user?.name || '',
  email: authStore.user?.email || '',

  nome_agencia: '',
  cnpj: '',
  razao_social: '',
  nome_fantasia: '',
  email_institucional: '',
  telefone_whatsapp: '',

  endereco: {  // Todos campos de endereço movidos para aqui
    endereco: '',
    cidade: '',
    estado: '',
    cep: '',
    pais: 'Brasil',
  },

  cadastur: '',
  instagram: '',

  segmento_principal_id: '',
  tipo_operacao_id: '',

  excursoes_proprias: false,
  aceita_excursoes_outras: false,
  recebe_representantes: false,
  necessita_agendamento: false,
  atende_freelance: false,
  divulgar: false,

  descricao_livre: '',
  logo_path: '',
});

async function submit() {
  try {
    await perfilStore.submitCompletarPerfil(form.value, store);
  } catch (error) {
    console.error('Erro no cadastro:', error);
  }
}
</script>