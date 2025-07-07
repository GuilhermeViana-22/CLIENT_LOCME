// Cache para cidades por UF
const cacheCidadesPorUF = new Map();

export const buscarCidades = async (UF, nomeCidade = '') => {
    try {
        if (!UF) return [];

        // Verifica cache
        if (!cacheCidadesPorUF.has(UF)) {
            const response = await fetch(
                `https://brasilapi.com.br/api/ibge/municipios/v1/${UF}?providers=dados-abertos-br,gov,wikipedia`
            );

            if (!response.ok) throw new Error('Erro ao buscar cidades');

            const dados = await response.json();

            // Transforma e armazena no cache
            const cidadesFormatadas = dados.map(cidade => ({
                value: cidade.nome, // ou cidade.codigo_ibge para usar código
                label: cidade.nome
            }));

            cacheCidadesPorUF.set(UF, cidadesFormatadas);
        }

        // Obtém do cache
        const cidadesUF = cacheCidadesPorUF.get(UF);

        // Filtra pelo nome se fornecido
        if (nomeCidade) {
            const termo = nomeCidade.toLowerCase();
            return cidadesUF.filter(c =>
                c.label.toLowerCase().includes(termo)
            );
        }

        return cidadesUF;

    } catch (error) {
        console.error('Erro ao buscar cidades:', error);
        return [];
    }
};