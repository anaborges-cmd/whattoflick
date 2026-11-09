# WhatToFlick

Plataforma de catalogação, pesquisa e classificação de filmes e séries, desenvolvida como projeto acadêmico da disciplina de Desenvolvimento de Interfaces Web (DIW).

## Objetivo

Oferecer uma interface para catalogar, pesquisar, filtrar, ordenar e classificar filmes e séries, com acesso às informações detalhadas de cada título.

## Funcionalidades

- Catálogo dinâmico de filmes e séries.
- Cadastro de novos títulos.
- Edição e exclusão de títulos cadastrados.
- Pesquisa por título.
- Filtros por tipo, gênero, ano de lançamento e nota mínima.
- Ordenação por título, ano e nota.
- Exibição das informações detalhadas de cada título.
- Armazenamento dos dados no navegador com `localStorage`.
- Integração com a API do TMDB para pesquisar e importar informações de filmes e séries.
- Interface responsiva para diferentes tamanhos de tela.

Os dados cadastrados são armazenados localmente no navegador, sem necessidade de banco de dados ou autenticação. O armazenamento é independente para cada navegador e origem de acesso.

## Tecnologias utilizadas

- HTML5 semântico.
- CSS3, Flexbox e CSS Grid.
- JavaScript.
- Web Storage API (`localStorage`).
- API do The Movie Database (TMDB).
- Cloudflare Worker para intermediar as consultas ao TMDB.
- Git e GitHub.
- GitHub Pages.

## Estrutura de arquivos

```text
whattoflick/
├── index.html
├── README.md
├── planejamento.md
├── pages/
│   ├── detalhes.html
│   └── cadastro.html
└── assets/
    ├── css/
    │   └── style.css
    ├── js/
    │   ├── app.js
    │   ├── cadastro.js
    │   ├── detalhes.js
    │   └── tmdb.js
    └── img/
        └── posters/
```

## Como executar

1. Clone ou baixe o repositório.
2. Abra a pasta do projeto no Visual Studio Code.
3. Execute o arquivo `index.html` utilizando a extensão Live Server.
4. Utilize o catálogo para pesquisar, filtrar, ordenar, cadastrar, editar e excluir títulos.

O projeto não exige instalação de dependências ou configuração de banco de dados.

A pesquisa de títulos no TMDB utiliza um serviço intermediário hospedado no Cloudflare Worker. O funcionamento dessa integração depende da disponibilidade do serviço.

## Armazenamento de dados

O sistema utiliza `localStorage` para armazenar os títulos cadastrados.

As informações permanecem disponíveis após o recarregamento da página, desde que os dados do navegador não sejam apagados.

As operações de cadastro, consulta, edição e exclusão são realizadas com JavaScript.

## Integração com o TMDB

O WhatToFlick permite pesquisar filmes e séries utilizando dados disponibilizados pelo The Movie Database (TMDB).

A integração possibilita consultar títulos e importar informações como nome, tipo, ano de lançamento, pôster, sinopse e gênero, conforme a disponibilidade dos dados retornados pela API.

As requisições são intermediadas por um Cloudflare Worker, evitando a exposição da chave pessoal da API no código JavaScript público.

**Atribuição:** este produto utiliza a API do TMDB, mas não é endossado nem certificado pelo TMDB.

Site oficial: https://www.themoviedb.org/

## Publicação

O projeto está disponível pelo GitHub Pages:

https://anaborges-cmd.github.io/whattoflick/

A publicação da Etapa 3 será realizada após a conclusão das verificações finais.

## Histórico de versões

### v1.0.0 — Etapa 1: HTML e estrutura semântica

- Estruturação das páginas com HTML5.
- Organização do catálogo, formulário e página de detalhes.
- Representação inicial das funcionalidades do sistema.

### v2.0.0 — Etapa 2: CSS, layout e responsividade

- Identidade visual com CSS externo.
- Organização dos elementos com Flexbox e CSS Grid.
- Estilização do catálogo, dos pôsteres, do formulário e da página de detalhes.
- Responsividade para diferentes tamanhos de tela.
- Estados visuais de interação e foco.

### Etapa 3 — JavaScript, dados e interatividade

- Implementação de funcionalidades dinâmicas com JavaScript.
- Cadastro, edição, consulta e exclusão de títulos.
- Persistência de dados com `localStorage`.
- Pesquisa, filtros e ordenação dinâmicos.
- Integração com a API pública do TMDB.
- Manipulação do DOM e tratamento de eventos.

Versão prevista para entrega: v3.0.0.