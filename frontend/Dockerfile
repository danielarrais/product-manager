# Imagem de Origem
FROM node:13

# Cria diretório de trabalho
RUN mkdir -p /app

# Diretório de trabalho(é onde a aplicação ficará dentro do container).
WORKDIR /app

# Instalando dependências da aplicação e armazenando em cache.
COPY package*.json ./
COPY yarn.lock ./

RUN npm rebuild node-sass --silent

RUN yarn install --silent