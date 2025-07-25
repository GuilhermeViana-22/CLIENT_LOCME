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
                id="usuario"
                label="Usuário"
                v-model="form.usuario"
                name="usuario"
                placeholder="Seu usuário"
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

            <TextArea
                id="bio"
                label="Biografia"
                v-model="form.bio"
                :error="storeErrors?.bio"
                :error-message="storeErrors?.bio?.[0]"
                required
                rows="6"
                placeholder="Digite sua biografia aqui..."
                class="w-full lg:col-span-2"
            />
            </div>

          <Line
              variant="text-center"
              color="border-gray-200"
              textColor="text-gray-700"
              spacing="my-8"
              text="Dados do Perfil"
          />

          <div class="grid lg:grid-cols-2 grid-cols-1 gap-4">

            <!-- Formulário -->
            <representante_form
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
import { useRepresentateStore } from "@/stores/perfil/representante.store.js";
import { usePerfilStore } from "@/stores/perfil/perfil.store.js";
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth/auth.store.js";
import ProfileAvatarCompact from "@/components/user/ProfileAvatarCompact.vue";
import Representante_form from "@/components/perfis/forms/representante_form.vue";
import TextInput from "@/components/formulario/TextInput.vue";
import ButtonSubmit from "@/components/formulario/ButtonSubmit.vue";
import InfoAlert from "@/components/utils/InfoAlert.vue";
import Line from "@/components/utils/Line.vue";
import TextArea from "@/components/formulario/TextArea.vue";
import { computed } from "vue";

const store = useRepresentateStore();
const perfilStore = usePerfilStore();
const authStore = useAuthStore();

const form = ref({
  usuario: authStore.user?.name || '',
  email: authStore.user?.email || '',
  bio : '',

  cpf: '',
  nome: authStore.user?.name || '',
  whatsapp: '',
  email_contato: authStore.user?.email || '',
  data_nascimento: '',
  operadora_id: null,
  empresa_id: null,
  empresa_outra: '',
  telefone_vendas: '',
  url: '',
  endereco: {  // Todos campos de endereço movidos para aqui
    endereco: '',
    cidade: '',
    estado: '',
    cep: '',
    pais: 'Brasil',
  },
  disponivel: true,
  cv: ''
});

// Computed para os erros da store
const storeErrors = computed(() => store.errors);

async function submit() {
  try {
    await perfilStore.submitCompletarPerfil(form.value, store);
  } catch (error) {
    console.error('Erro no cadastro:', error);
  }
}
</script>