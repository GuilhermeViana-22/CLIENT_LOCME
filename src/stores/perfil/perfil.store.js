import { defineStore } from 'pinia'
import perfisService from "@/services/perfis/perfis.js";

export const usePerfilStore = defineStore('perfil', {
    state: () => ({
        tiposPerfil: [],
        isLoading: false,
        error: null
    }),
    actions: {
        async fetchTiposPerfil() {
            this.isLoading = true
            this.error = null
            try {
                const response = await perfisService.getTiposPerfis()
                this.tiposPerfil = response.data
            } catch (error) {
                this.error = error.message || 'Falha ao carregar tipos de perfil'
                console.error('Erro ao buscar tipos de perfil:', error)
            } finally {
                this.isLoading = false
            }
        }
    }
})