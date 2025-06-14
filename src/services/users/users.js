import api from '@/services/api'

const usersService = {
  async getAll(params = {}) {
    try {
      const response = await api.get('/users', { params });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      throw this.handleError(error);
    }
  },

  async getById(id) {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar usuário ${id}:`, error);
      throw this.handleError(error);
    }
  },

  async getMe() {
    try {
      const response = await api.get(`/me`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar informações:`, error);
      throw this.handleError(error);
    }
  },

  async getTiposPerfis() {
    try {
      const response = await api.get(`/me`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar informações:`, error);
      throw this.handleError(error);
    }
  },

  async create(userData) {
    try {
      const response = await api.post('/users', userData);
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
      const response = await api.put(`/users/${id}`, userData);
      return response.data;
    } catch (error) {
      console.error(`Erro na API ao atualizar usuário ${id}:`, error.response?.data || error.message);
      throw this.handleError(error);
    }
  },

  //atualizando
  async updateAvatar(data) {
    try {
      console.log(`Enviando dados para atualização do avatar do usuário:`, data);
      return await api.post(`/profile/updateavatar`, data);
    } catch (error) {
      console.error(`Erro na API ao atualizar usuário:`, error.response?.data || error.message);
      throw this.handleError(error);
    }
  },

  async delete(id) {
    try {
      const response = await api.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao deletar usuário ${id}:`, error);
      throw this.handleError(error);
    }
  },

  async toggleStatus(id) {
    try {
      const response = await api.patch(`/users/${id}/toggle-status`);
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