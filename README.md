# Product Manager (com Ruby On Rails e React.js)

Este projeto é uma aplicação simples para importação de produtos via arquivo com os registros em formato JSON, permitindo também a edição e a exclusão dos registros importados.

## Como executar a aplicação

Seguem abaixo o passo a passo para execução das aplicações em seu ambiente local.

### Projeto Ruby On Rails (backend)

> Caso ocorra erro ao instalar a gem **mysql2**, execute um dos seguintes comandos no terminal do seu sistema operacional: `sudo apt install -y default-libmysqlclient-dev` ou ` sudo apt install libmysqlclient-dev`.

1. [Instalar](https://gorails.com/setup/ubuntu/20.04) o Ruby On Rails 6 na máquina onde será escutada a aplicação;
1. Clonar o projeto no local desejado;
1. Rodar o comando `bundle install` dentro da pasta **backend**;
1. Rodar o comando `rails server -b 0.0.0.0 -p 3000` dentro da pasta **backend**;

### Projeto React.js (frontend)

1. Instalar o Nodejs 12 ou 13 na máquina onde será escutada a aplicação;
1. Clonar o projeto no local desejado;
1. Rodar o comando `yarn install` dentro da pasta **frontend**;
1. Rodar o comando `npm start` dentro da pasta **frontend**;

### Executar usando docker-compose

Opcionalmente você pode executar a aplicação em containers docker para isso basta instalar o docker e o docker compose em sua máquina, caso ainda não o tenha feito, e rodar o comando `docker-compose up` na raiz do respositório.

Caso não queira ver os logs da execução, basta adicionar a flag `-d` ao comando para que ele rode em segundo plano e não exiba os logs.

# Sujestões de melhorias 

#### **Backend**

1. Documentar a API usando a GEM [rswag](https://github.com/rswag/rswag);
1. Usar o resque para processar o arquivo em background e usar o actioncable para notificação a aplicação sobre o termino do processamento;
1. Melhorar a autenticação para que a cada requisição seja gerado um novo token;
1. Ajustar o arquivo de configuração do banco de dados para recuperar os dados de login das variáveis do sistema operacional;

#### **Frontend**

1. Melhorar o tratamento de erro das requisições na aplicação React;
1. Implementar testes unitários;
1. Refatorar e reduzir o tamanho dos componentes;