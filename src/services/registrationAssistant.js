class RegistrationAssistant {
    constructor() {
        this.sequentialThinking = null; // Referência para o MCP sequential thinking
    }

    /**
     * Analisa o formulário de registro usando sequential thinking
     * @param {Object} formData - Dados do formulário
     * @param {string} profileType - Tipo de perfil selecionado
     * @returns {Object} Análise e sugestões
     */
    async analyzeRegistrationForm(formData, profileType) {
        if (profileType !== 'agente_viagem') {
            return { suggestions: [], validation: [], score: 100 };
        }

        const analysis = await this._thinkAboutRegistration(formData);
        return analysis;
    }

    /**
     * Usa sequential thinking para analisar o contexto do registro
     */
    async _thinkAboutRegistration(formData) {
        const thoughts = [];
        const suggestions = [];
        const validation = [];
        let completionScore = 0;

        // Análise do nome
        if (formData.name) {
            thoughts.push("Usuário preencheu o nome. Verificando se parece completo...");
            if (formData.name.split(' ').length < 2) {
                suggestions.push({
                    type: 'warning',
                    field: 'name',
                    message: 'Como agente de viagem, recomendamos usar seu nome completo para maior credibilidade profissional.'
                });
            } else {
                completionScore += 20;
                thoughts.push("Nome parece completo, bom para perfil profissional.");
            }
        } else {
            validation.push({
                type: 'error',
                field: 'name',
                message: 'Nome é obrigatório para agentes de viagem.'
            });
        }

        // Análise do email
        if (formData.email) {
            thoughts.push("Email preenchido. Verificando se é profissional...");
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailPattern.test(formData.email)) {
                completionScore += 20;
                thoughts.push("Email tem formato válido.");
                
                // Sugestão para emails profissionais
                if (formData.email.includes('gmail') || formData.email.includes('hotmail')) {
                    suggestions.push({
                        type: 'tip',
                        field: 'email',
                        message: 'Considera usar um email profissional com seu nome para transmitir mais credibilidade aos clientes.'
                    });
                }
            } else {
                validation.push({
                    type: 'error',
                    field: 'email',
                    message: 'Formato de email inválido.'
                });
            }
        }

        // Análise da senha
        if (formData.password) {
            thoughts.push("Verificando força da senha...");
            if (formData.password.length >= 8) {
                completionScore += 15;
                if (formData.password_confirmation === formData.password) {
                    completionScore += 10;
                    thoughts.push("Senha forte e confirmação está correta.");
                } else {
                    validation.push({
                        type: 'error',
                        field: 'password_confirmation',
                        message: 'Confirmação de senha não confere.'
                    });
                }
            } else {
                validation.push({
                    type: 'error',
                    field: 'password',
                    message: 'Senha deve ter pelo menos 8 caracteres.'
                });
            }
        }

        // Análise específica para agente de viagem
        thoughts.push("Analisando perfil como agente de viagem... Este é um perfil profissional.");
        
        suggestions.push({
            type: 'info',
            field: 'general',
            message: '✈️ Como agente de viagem, você terá acesso a ferramentas exclusivas para conectar-se com representantes e fornecedores.'
        });

        // Sugestões para próximos passos
        if (completionScore >= 50) {
            suggestions.push({
                type: 'success',
                field: 'general',
                message: '🎉 Perfil está bem estruturado! Após o registro, não esqueça de completar seu perfil profissional com CPF, WhatsApp e portfólio.'
            });
        }

        return {
            thoughts,
            suggestions,
            validation,
            completionScore: Math.min(completionScore, 100),
            isReadyToSubmit: validation.length === 0 && completionScore >= 45
        };
    }

    /**
     * Valida dados específicos de agente de viagem
     */
    validateAgenteViagemData(data) {
        const errors = [];
        const suggestions = [];

        // Validação CPF
        if (data.cpf && !this._isValidCPF(data.cpf)) {
            errors.push({ field: 'cpf', message: 'CPF inválido.' });
        }

        // Validação WhatsApp
        if (data.whatsapp && !this._isValidPhone(data.whatsapp)) {
            errors.push({ field: 'whatsapp', message: 'Formato de WhatsApp inválido.' });
        }

        // Sugestões para portfolio
        if (!data.portfolio_redes_sociais) {
            suggestions.push({
                type: 'tip',
                field: 'portfolio_redes_sociais',
                message: 'Adicione suas redes sociais ou portfolio para atrair mais clientes!'
            });
        }

        return { errors, suggestions };
    }

    /**
     * Gera sugestões contextuais baseadas no estado atual
     */
    getSuggestions(context) {
        const suggestions = [];

        if (context.isNewUser) {
            suggestions.push({
                type: 'welcome',
                message: 'Bem-vindo ao LocMe! Como agente de viagem, você terá acesso a uma rede exclusiva de fornecedores.'
            });
        }

        if (context.hasIncompleteFields) {
            suggestions.push({
                type: 'action',
                message: 'Complete todos os campos para ter um perfil mais atrativo para clientes e parceiros.'
            });
        }

        return suggestions;
    }

    // Métodos auxiliares de validação
    _isValidCPF(cpf) {
        cpf = cpf.replace(/[^\d]/g, '');
        if (cpf.length !== 11) return false;
        
        // Verificação básica de CPF
        let sum = 0;
        for (let i = 0; i < 9; i++) {
            sum += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let remainder = 11 - (sum % 11);
        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(cpf.charAt(9))) return false;

        sum = 0;
        for (let i = 0; i < 10; i++) {
            sum += parseInt(cpf.charAt(i)) * (11 - i);
        }
        remainder = 11 - (sum % 11);
        if (remainder === 10 || remainder === 11) remainder = 0;
        return remainder === parseInt(cpf.charAt(10));
    }

    _isValidPhone(phone) {
        const phonePattern = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
        return phonePattern.test(phone);
    }
}

export default new RegistrationAssistant(); 