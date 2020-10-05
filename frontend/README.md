# Product Manager com React.js

Este projeto é uma aplicação simples desenvolvida em React.js para importação de produtos via arquivo com os registros em formato JSON. Além da importação ele permite a edição e a exclusão dos registros importados.

## Como executar a aplicação no Linux Ubuntu

Seguem abaixo o passo a passo para execução da aplicação no seu ambiente local.

### Projeto React.js (frontend)

1. Instalar o Nodejs 12 ou 13 na máquina onde será escutada a aplicação;
1. Clonar o projeto no local desejado;
1. Rodar o comando `yarn install` dentro da pasta **frontend**;
1. Rodar o comando `npm start` dentro da pasta **frontend**;

### Executar usando docker-compose

Opcionalmente você pode executar a aplicação em containers docker para isso basta instalar o docker e o docker compose em sua máquina, caso ainda não o tenha feito, e rodar o comando `docker-compose up` na raiz do respositório.

Caso não queira ver os logs da execução, basta adicionar a flag `-d` ao comando para que ele rode em segundo plano e não exiba os logs.

# Sujestões de melhorias 

1. Melhorar o tratamento de erro das requisições na aplicação React;
1. Implementar testes unitários;
1. Refatorar e reduzir o tamanho dos componentes;