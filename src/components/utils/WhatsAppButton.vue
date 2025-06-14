<template>
  <div>
    <!-- WhatsApp Button with Badge -->
    <div
      @click="toggleChat"
      class="whatsapp-btn fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg cursor-pointer flex items-center justify-center relative"
    >
      <i class="fab fa-whatsapp fa-2x"></i>
      <span
        v-show="showBadge"
        class="badge absolute top-0 right-0 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full"
      >
        1
      </span>
    </div>

    <!-- Chat Box -->
    <div
      v-show="showForm"
      class="chat-box fixed bottom-24 right-6 bg-white p-6 rounded-lg shadow-xl w-72"
    >
      <h3 class="text-xl font-semibold mb-4">Como podemos te ajudar?</h3>
      <textarea
        v-model="message"
        rows="4"
        class="w-full p-2 border border-gray-300 rounded-md mb-4"
        placeholder="Escreva sua mensagem..."
      ></textarea>
      <button
        @click="sendMessage"
        class="w-full bg-green-500 text-white py-2 rounded-md"
      >
        Enviar
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const showForm = ref(false); // Controla a visibilidade do chat
const showBadge = ref(true); // Exibe o badge de notificação
const message = ref(''); // Armazena a mensagem digitada

// Alterna entre abrir e fechar o chat
const toggleChat = () => {
  showForm.value = !showForm.value;
  if (showForm.value) showBadge.value = false; // Esconde o badge ao abrir o chat
};

// Enviar mensagem para o WhatsApp
const sendMessage = () => {
  if (message.value.trim()) {
    const phoneNumber = '5511970419195'; // Substitua pelo número desejado
    const encodedMessage = encodeURIComponent(message.value);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');

    message.value = ''; // Limpa a mensagem
    showForm.value = false; // Fecha o chat após o envio
  } else {
    alert('Por favor, digite uma mensagem.');
  }
};
</script>

<style scoped>
/* Botão do WhatsApp */
.whatsapp-btn {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 1000;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
}

.whatsapp-btn:hover {
  transform: scale(1.1);
}

/* Badge de notificação */
.badge {
  position: absolute;
  top: -5px;
  right: -5px;
  width: 20px;
  height: 20px;
  background-color: red;
  color: white;
  font-size: 12px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

/* Caixa de chat */
.chat-box {
  position: fixed;
  bottom: 6rem;
  right: 1.5rem;
  z-index: 999;
}

.w-72 {
  width: 18rem;
}

textarea {
  resize: none;
}

/* Animação do botão */
@keyframes bounce {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0);
  }
}

.whatsapp-btn:hover {
  animation: bounce 0.5s ease-in-out infinite;
}
</style>
