# Etapa de build
FROM node:18-alpine AS builder

WORKDIR /app

# Copie arquivos essenciais para cache eficiente
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copie o restante do código-fonte
COPY . .

# Build para produção
RUN yarn build

# Etapa de produção (Nginx)a
FROM nginx:alpine

# Copie build para webroot padrão do Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Healthcheck simples
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
   CMD wget -q --spider http://localhost:80/ || exit 1

EXPOSE 80

# Use usuário não-root para servir os arquivos estáticos em produção
RUN adduser -D -u 1001 appuser && chown -R appuser /usr/share/nginx/html
USER appuser

CMD ["nginx", "-g", "daemon off;"]
