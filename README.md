# Gerenciamento de Despesas Pessoais

## Objetivo do Projeto

O **Gerenciamento de Despesas Pessoais** é um sistema desenvolvido em **React Native** que permite ao usuário controlar suas finanças pessoais, categorizando despesas, registrando valores e criando relatórios com base nas informações inseridas. O objetivo principal é fornecer uma interface intuitiva para o gerenciamento financeiro diário, ajudando o usuário a acompanhar seus gastos e a tomar decisões mais informadas sobre seu orçamento.

### Funcionalidades Principais:
- **Cadastro de despesas**: O usuário pode adicionar despesas, informando a categoria, o estabelecimento, o valor gasto e a data da transação.
- **Exclusão de despesas**: Permite ao usuário excluir despesas registradas.
- **Visualização das despesas**: As despesas são listadas de forma clara, exibindo as informações importantes como categoria, estabelecimento, valor e data.
- **Filtros**: O usuário pode filtrar as despesas por data ou categoria.

## Como Fazer o Projeto Funcionar

Para que o **Gerenciamento de Despesas Pessoais** funcione corretamente em seu ambiente, siga as instruções abaixo. Este projeto é desenvolvido com **React Native** e, se você estiver rodando a API localmente (no seu computador), o Ngrok pode ser utilizado para criar um túnel seguro e expor a API para acesso remoto, facilitando a comunicação com o aplicativo móvel ou frontend.

### Passos:

1. **Clonando o Repositório**
   Clone o repositório do projeto usando o comando Git:

   ```bash
   git clone https://github.com/diogorcarvalho/gestaoparts-app-front.git

2. **Instalar dependências**
   ```bash
   npm install

3. **Rodar o projeto**
   ```bash
   npx expo start

## Sugestão para a Conectividade do Aplicativo e API

Como  o projeto do aplicativo depende de sua API e provavelmente você irá roldar localmente, uma boa opção é utilizar o Ngrok (https://ngrok.com/) para realizar a integração entre a API (https://github.com/diogorcarvalho/gestaoparts-backend.git) e o aplicativo.

## Configuração da BASE URL

Na arquivo ‘src/services/api.ts’ atribua a url no atributo “baseURL”, ele se encontra na linha 4
   ```bash
   import axios, { AxiosResponse } from 'axios';

   const api = axios.create({
   baseURL: 'https://localhost:3000/',  // 👈 aqui
   });

   export interface Category {
   id: number;
   name: string;
   }

