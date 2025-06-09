<template>
  <div class="profile-avatar">
    <!-- Avatar com overlay para editar -->
    <div class="avatar-wrapper w-24 h-24" @click="showModal = true">
      <img :src="user.foto_perfil_url" class="avatar-image">
      <div class="avatar-overlay">
        <i class="fas fa-camera"></i>
      </div>
    </div>

    <!-- Modal de Upload -->
    <Modal :show="showModal" @close="showModal = false">
      <template #header>
        <h2 class="text-primary font-bold">Alterar Foto de Perfil</h2>
      </template>

      <template #body>
        <div class="upload-container">
          <!-- Pré-visualização -->
          <div v-if="previewImage" class="image-preview flex justify-center">
            <img :src="previewImage" alt="Preview" class="preview-image rounded-full object-cover object-center">
          </div>

          <!-- Input de arquivo -->
          <div class="file-upload">
            <label for="avatar-upload" class="upload-label">
              <i class="fas fa-cloud-upload-alt"></i> Selecione uma imagem
            </label>
            <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                @change="handleFileChange"
                class="file-input"
            >
          </div>
        </div>
      </template>

      <template #footer>
        <button class="btn btn-secondary px-6 py-2 border border-transparent rounded-lg font-medium text-white bg-secondary hover:bg-red-700 transition-colors" @click="showModal = false">Cancelar</button>
        <button
            class="btn btn-primary px-6 py-2 border border-transparent rounded-lg font-medium text-white bg-green-600 hover:bg-green-700 transition-colors"
            @click="uploadAvatar"
            :disabled="!selectedFile || uploading"
        >
          <span v-if="uploading">Enviando...</span>
          <span v-else>Salvar</span>
        </button>
      </template>
    </Modal>
  </div>
</template>

<script>

import users from "@/services/users/users.js";
import Modal from "@/components/Modal.vue";
import {useToast} from "vue-toastification";
import {hideLoading, showFancyLoading} from "@/utils/swalCustoms.js";

export default {
  components: {Modal},
  props: {
    user: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      showModal: false,
      selectedFile: null,
      previewImage: null,
      uploading: false
    }
  },

  methods: {
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file && file.type.match('image.*')) {
        this.selectedFile = file;

        // Criar pré-visualização
        const reader = new FileReader();
        reader.onload = (e) => {
          this.previewImage = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },

    async uploadAvatar() {
      const toast = useToast()

      /// fancyload
      showFancyLoading();

      if (!this.selectedFile) return;

      this.uploading = true;

      try {
        const formData = new FormData();
        formData.append('foto_perfil', this.selectedFile);

        // Chamada para o backend Laravel
        const response = await users.updateAvatar(formData);

        // Atualizar a foto do usuário
        this.$emit('avatar-updated', response.foto_perfil_url);
        this.showModal = false;

        // sucesso
        toast.success("Sua foto foi atualizada!", {
          position: "bottom-right",
          timeout: 3000
        })

      } catch (error) {
        // sucesso
        toast.error("Erro ao tentar atualizar sua foto!", {
          position: "bottom-right",
          timeout: 3000
        })
      } finally {
        hideLoading();
        this.uploading = false;
      }
    }
  }
}
</script>

<style scoped>
.avatar-wrapper {
  position: relative;
  cursor: pointer;
}

.avatar-image {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.avatar-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  opacity: 0;
  transition: opacity 0.3s;
}

.avatar-wrapper:hover .avatar-overlay {
  opacity: 1;
}

.upload-container {
  text-align: center;

}

.image-preview {
  margin-bottom: 20px;
}

.preview-image {
  width: 200px;
  height: 200px;
}

.file-upload {
  margin: 20px 0;
}

.file-input {
  display: none;
}

.upload-label {
  padding: 10px 15px;
  background: #eee;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.upload-label:hover {
  background: #ddd;
}
</style>