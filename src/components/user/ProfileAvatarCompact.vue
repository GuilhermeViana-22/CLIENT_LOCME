<template>
  <div class="relative inline-block mb-4">
    <!-- Avatar com overlay para editar -->
    <div
        class="avatar-wrapper rounded-full flex items-center justify-center shadow-md z-1"
        :class="[sizeClasses, bgColorClass]"
        @click="showModal = editable"
    >
      <!-- Mostra a foto ou iniciais -->
      <img
          v-if="user?.foto_perfil_url"
          :src="user.foto_perfil_url"
          class="avatar-image"
      >
      <span v-else class="text-white" :class="textSizeClass">
        {{ computedInitials }}
      </span>

      <!-- Overlay de edição -->
      <div v-if="editable" class="avatar-overlay">
        <i class="fas fa-camera"></i>
      </div>
    </div>

    <!-- Modal de Upload -->
    <Modal v-if="editable" :show="showModal" @close="showModal = false">
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
        <button
            class="btn btn-secondary px-6 py-2 border border-transparent rounded-lg font-medium text-white bg-secondary hover:bg-red-700 transition-colors"
            @click="showModal = false"
        >
          Cancelar
        </button>
        <button
            class="btn btn-primary px-6 py-2 border border-transparent rounded-lg font-medium text-white bg-green-600 hover:bg-green-700 transition-colors"
            @click="uploadAvatar"
            :disabled="!selectedFile || authStore.isLoading"
        >
          <span v-if="authStore.isLoading">Enviando...</span>
          <span v-else>Salvar</span>
        </button>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth/auth.store.js'
import Modal from "@/components/utils/Modal.vue"

const props = defineProps({
  user: {
    type: Object,
    default: () => ({})
  },
  name: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value)
  },
  bgColor: {
    type: String,
    default: 'accent'
  },
  editable: {
    type: Boolean,
    default: false
  }
})

const authStore = useAuthStore()
const showModal = ref(false)
const selectedFile = ref(null)
const previewImage = ref(null)

// Classes computadas
const sizeClasses = computed(() => {
  const sizes = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-40 h-40'
  }
  return sizes[props.size]
})

const textSizeClass = computed(() => {
  const sizes = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-5xl',
    xl: 'text-6xl'
  }
  return sizes[props.size]
})

const bgColorClass = computed(() => {
  return `bg-${props.bgColor}`
})

const computedInitials = computed(() => {
  const name = props.user?.name || props.name
  if (!name) return '??'

  return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase()
})

// Métodos
const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file && file.type.match('image.*')) {
    selectedFile.value = file

    const reader = new FileReader()
    reader.onload = (e) => {
      previewImage.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const uploadAvatar = async () => {
  if (!selectedFile.value) return

  try {
    await authStore.updateProfilePhoto(selectedFile.value)
    showModal.value = false
    selectedFile.value = null
    previewImage.value = null
  } catch (error) {
    console.error('Erro ao atualizar foto:', error)
  }
}
</script>

<style scoped>
.avatar-wrapper {
  position: relative;
  cursor: pointer;
  overflow: hidden;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
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