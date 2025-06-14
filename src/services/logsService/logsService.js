    import axios from 'axios';

    // Usa a variável de ambiente definida no .env
    const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000';
    
    const cargosService = {
    async getAll() {  
        try {
        const response = await axios.get(`${API_BASE_URL}/log`);
        return response.data;
        } catch (error) {
        console.error('Erro ao buscar log:', error);
        throw error;
        }
    },
    };

    export default cargosService;
