# --- Estágio 1: Build (A "Cozinha") ---
# Usamos uma imagem completa do Node para ter o yarn e ferramentas de build
FROM node:18-alpine AS builder

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de manifesto de dependências
# Fazemos isso primeiro para aproveitar o cache do Docker
COPY package.json yarn.lock* ./

# Instala as dependências de produção
RUN yarn install --frozen-lockfile --production

# Copia o resto do código da aplicação
COPY . .

# --- Estágio 2: Final (A "Sala de Jantar") ---
# Começamos com uma imagem limpa e leve do Node
FROM node:18-alpine

# Define o diretório de trabalho
WORKDIR /app

# Copia as dependências instaladas do estágio 'builder'
COPY --from=builder /app/node_modules ./node_modules

# Copia o código da aplicação do estágio 'builder'
COPY --from=builder /app ./

# Expõe a porta que a aplicação usa (como vimos no README)
EXPOSE 3333

# O comando final para rodar a aplicação em modo de produção
CMD ["node", "src/server.js"]