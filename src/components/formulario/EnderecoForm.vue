<template>
  <!-- Endereço -->
  <div class="md:col-span-2 mt-4 pt-4 border-t border-gray-200">
    <div class="mb-4">
      <TextInput
          id="endereco"
          label="Endereço Completo"
          v-model="modelValue.endereco"
          name="endereco"
          placeholder="Rua, número, complemento"
          :error="storeErrors?.endereco"
          :error-message="storeErrors?.endereco?.[0]"
          :required="required"
          :readonly="readonly"
          :disabled="disabled"
          class="w-full"
      />
    </div>
    <div class="grid md:grid-cols-3 gap-6">
      <div>
        <TextInput
            id="cidade"
            label="Cidade"
            v-model="modelValue.cidade"
            name="cidade"
            placeholder="Cidade"
            :error="storeErrors?.cidade"
            :error-message="storeErrors?.cidade?.[0]"
            :required="required"
            :readonly="readonly"
            :disabled="disabled"
            class="w-full"
        />
      </div>
      <div>
        <label for="estado" class="block text-sm font-medium text-gray-700">
          Estado (UF) <span v-if="required" class="text-red-500">*</span>
        </label>
        <div class="mt-1">
          <select
              id="estado"
              v-model="modelValue.estado"
              name="estado"
              :required="required"
              :disabled="disabled || readonly"
              class="py-2 px-3 block w-full border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              :class="{'border-red-400': storeErrors?.estado, 'border-gray-300': !storeErrors?.estado}"
          >
            <option value="" disabled>Selecione o estado</option>
            <option value="AC">Acre</option>
            <option value="AL">Alagoas</option>
            <option value="AP">Amapá</option>
            <option value="AM">Amazonas</option>
            <option value="BA">Bahia</option>
            <option value="CE">Ceará</option>
            <option value="DF">Distrito Federal</option>
            <option value="ES">Espírito Santo</option>
            <option value="GO">Goiás</option>
            <option value="MA">Maranhão</option>
            <option value="MT">Mato Grosso</option>
            <option value="MS">Mato Grosso do Sul</option>
            <option value="MG">Minas Gerais</option>
            <option value="PA">Pará</option>
            <option value="PB">Paraíba</option>
            <option value="PR">Paraná</option>
            <option value="PE">Pernambuco</option>
            <option value="PI">Piauí</option>
            <option value="RJ">Rio de Janeiro</option>
            <option value="RN">Rio Grande do Norte</option>
            <option value="RS">Rio Grande do Sul</option>
            <option value="RO">Rondônia</option>
            <option value="RR">Roraima</option>
            <option value="SC">Santa Catarina</option>
            <option value="SP">São Paulo</option>
            <option value="SE">Sergipe</option>
            <option value="TO">Tocantins</option>
          </select>
        </div>
        <div v-if="storeErrors?.estado" class="text-red-600 text-sm mt-1.5">
          {{ storeErrors.estado[0] }}
        </div>
      </div>
      <div>
        <TextInput
            id="cep"
            label="CEP"
            v-model="cepModel"
            name="cep"
            placeholder="00000-000"
            mask="#####-###"
            :error="storeErrors?.cep"
            :error-message="storeErrors?.cep?.[0]"
            :required="required"
            :readonly="readonly"
            :disabled="disabled"
            @blur="consultarCEP"
            class="w-full"
        />
        <button
            v-if="!readonly && !disabled"
            type="button"
            @click="consultarCEP"
            class="mt-2 text-sm text-primary hover:text-primary-dark font-medium"
        >
          Buscar CEP
        </button>
      </div>
    </div>
    <div class="mt-4">
      <TextInput
          id="pais"
          label="País"
          v-model="modelValue.pais"
          name="pais"
          placeholder="País"
          :error="storeErrors?.pais"
          :error-message="storeErrors?.pais?.[0]"
          :required="required"
          :readonly="readonly"
          :disabled="disabled"
          class="w-full"
      />
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import TextInput from "@/components/formulario/TextInput.vue";

export default {
  name: 'EnderecoForm',
  components: {TextInput},
  props: {
    modelValue: {
      type: Object,
      required: true,
      default: () => ({
        endereco: '',
        cidade: '',
        estado: '',
        cep: '',
        pais: 'Brasil',
      }),
    },
    storeErrors: {
      type: Object,
      default: () => ({}),
    },
    required: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  computed: {
    cepModel: {
      get() {
        return this.modelValue.cep;
      },
      set(value) {
        this.$emit('update:modelValue', { ...this.modelValue, cep: value });
      },
    },
  },
  methods: {
    async consultarCEP() {
      // Remove caracteres não numéricos
      const cep = this.modelValue.cep?.replace(/\D/g, '');

      // Verifica se o CEP tem 8 dígitos
      if (!cep || cep.length !== 8) {
        return;
      }

      try {
        const loadingSwal = Swal.fire({
          title: 'Consultando CEP...',
          allowOutsideClick: false,
          showConfirmButton: false,
          willOpen: () => {
            Swal.showLoading();
          },
        });

        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        await loadingSwal.close();

        if (data.erro) {
          Swal.fire({
            icon: 'error',
            title: 'CEP não encontrado',
            text: 'O CEP informado não foi encontrado na base de dados.',
          });
          return;
        }

        // Atualiza os campos com os dados do CEP
        this.$emit('update:modelValue', {
          ...this.modelValue,
          endereco: `${data.logradouro || ''}${data.complemento ? ', ' + data.complemento : ''}`,
          cidade: data.localidade || '',
          estado: data.uf || '',
          cep: data.cep || this.modelValue.cep,
          pais: 'Brasil',
        });

        Swal.fire({
          icon: 'success',
          title: 'CEP encontrado!',
          text: 'Os dados de endereço foram preenchidos automaticamente.',
          timer: 2000,
          showConfirmButton: false,
        });

      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao consultar CEP',
          text: 'Ocorreu um erro ao tentar consultar o CEP. Por favor, tente novamente mais tarde.',
        });
        console.error('Erro ao consultar CEP:', error);
      }
    },
  },
};
</script>