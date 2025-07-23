# Etapa de build
FROM node:18-alpine AS builder

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências primeiro (para aproveitar cache do Docker)
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# Instalar dependências baseado no gerenciador de pacotes disponível
RUN if [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm install --frozen-lockfile; \
    else npm install; fi

# Copiar código fonte
COPY . .

# Build da aplicação para produção
RUN if [ -f yarn.lock ]; then yarn build; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm build; \
    else npm run build; fi

# Etapa de produção sem nginx
FROM node:18-alpine AS production

# Criar diretório da aplicação
WORKDIR /app

# Copiar apenas arquivos necessários da build
COPY --from=builder /app .

# Instalar dependências de produção
RUN if [ -f yarn.lock ]; then yarn install --production --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci --only=production; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm install --prod --frozen-lockfile; \
    else npm install --production; fi

# Criar usuário não-root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S appuser -u 1001

USER appuser

# Expor porta (ex: 3000 para Next.js ou serve)
EXPOSE 3000

# Healthcheck básico (ajuste se necessário)
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:3000 || exit 1

# Comando padrão (ajuste conforme a sua aplicação)
CMD ["node", "server.js"]