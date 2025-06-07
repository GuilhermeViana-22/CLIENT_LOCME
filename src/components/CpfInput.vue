<template>

    <!-- Input com máscara de CPF -->
    <input
        v-mask="'###.###.###-##'"
        type="text"
        placeholder="000.000.000-00"
    >

</template>

<script>
import { mask } from 'vue-the-mask'; // Importa a diretiva

export default {
  directives: { // Registra a diretiva localmente
    mask // Equivalente a "mask: mask"
  }
}
</script>