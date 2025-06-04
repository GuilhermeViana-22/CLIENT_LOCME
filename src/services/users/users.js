import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

// Configuração padrão do axios para esta API
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

const usersService = {
  async getAll(params = {}) {
    try {
      const response = await apiClient.get('/users', { params });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      throw this.handleError(error);
    }
  },

  async getById(id) {
    try {
      const response = await apiClient.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar usuário ${id}:`, error);
      throw this.handleError(error);
    }
  },

  async create(userData) {
    try {
      const response = await apiClient.post('/users', userData);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      throw this.handleError(error);
    }
  },
//atualizando
async update(id, userData) {
  try {
    console.log(`Enviando dados para atualização do usuário ${id}:`, userData);
    const response = await apiClient.put(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error(`Erro na API ao atualizar usuário ${id}:`, error.response?.data || error.message);
    throw this.handleError(error);
  }
},

  async delete(id) {
    try {
      const response = await apiClient.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao deletar usuário ${id}:`, error);
      throw this.handleError(error);
    }
  },

  async toggleStatus(id) {
    try {
      const response = await apiClient.patch(`/users/${id}/toggle-status`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao alternar status do usuário ${id}:`, error);
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

export default usersService;