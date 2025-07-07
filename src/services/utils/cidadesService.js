// Cache simples para evitar múltiplas requisições da mesma UF
const cacheCidadesPorUF = new Map();

export const buscarCidades = async (UF, nomeCidade = '') => {
    try {
        // Se não tem UF definida, retorna vazio
        if (!UF) return [];

        // Verifica se já temos as cidades desta UF em cache
        if (!cacheCidadesPorUF.has(UF)) {
            const response = await fetch(
                `https://brasilapi.com.br/api/ibge/municipios/v1/${UF}?providers=dados-abertos-br,gov,wikipedia`
            );

            if (!response.ok) throw new Error('Erro ao buscar cidades');

            const dados = await response.json();

            // Armazena no cache
            cacheCidadesPorUF.set(UF, dados);
        }

        // Obtém cidades do cache
        const cidadesUF = cacheCidadesPorUF.get(UF);

        // Filtra pelo nome da cidade (caso tenha sido fornecido)
        const nomeBusca = nomeCidade.toLowerCase();
        const cidadesFiltradas = nomeCidade
            ? cidadesUF.filter(cidade =>
                cidade.nome.toLowerCase().includes(nomeBusca))
            : cidadesUF;

        return cidadesFiltradas.map(cidade => ({
            value: cidade.nome, // Ou cidade.codigo_ibge se preferir usar ID
            label: cidade.nome
        }));

    } catch (error) {
        console.error('Erro ao buscar cidades:', error);
        return [];
    }
};