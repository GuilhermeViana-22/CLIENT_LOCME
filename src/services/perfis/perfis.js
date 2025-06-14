import api from '@/services/api'

const perfisService = {


    // método que recupera os tipos de perfis
    async getTiposPerfis() {
        try {
            const response = await api.get(`/perfil/tipos`);
            return response.data;
        } catch (error) {
            console.error(`Erro ao buscar informações:`, error);
            throw this.handleError(error);
        }
    },


    handleError(error) {
        // Padroniza o tratamento de erros
        if (error.response) {
            // Erros da API (4xx, 5xx)
            return {
                message: error.response.data?.message || 'Erro na requisição',
                status: error.response.status,
                data: error.response.data
            };
        } else if (error.request) {
            // Erros de conexão
            return {
                message: 'Sem resposta do servidor',
                status: null
            };
        } else {
            // Outros erros
            return {
                message: error.message,
                status: null
            };
        }
    }
};

export default perfisService;