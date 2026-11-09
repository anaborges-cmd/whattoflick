
const CHAVE_STORAGE = "whattoflick-titulos";

const parametros = new URLSearchParams(window.location.search);
const idTitulo = parametros.get("id");

const card = document.querySelector("#detalhe-card");
const mensagem = document.querySelector("#mensagem-detalhes");

function carregarTitulos() {
    try {
        const dados = JSON.parse(localStorage.getItem(CHAVE_STORAGE));
        return Array.isArray(dados) ? dados : [];
    } catch (erro) {
        console.error("Erro ao carregar títulos:", erro);
        return [];
    }
}

function adicionarInformacao(rotulo, valor) {
    if (valor === undefined || valor === null || valor === "") {
        return;
    }

    const paragrafo = document.createElement("p");
    const destaque = document.createElement("strong");

    destaque.textContent = `${rotulo}: `;
    paragrafo.append(destaque, document.createTextNode(String(valor)));

    document.querySelector("#detalhe-meta").appendChild(paragrafo);
}

function mostrarDetalhes() {
    const titulo = carregarTitulos().find(
        item => String(item.id) === String(idTitulo)
    );

    if (!idTitulo || !titulo) {
        card.hidden = true;
        mensagem.textContent =
            "Título não encontrado. Volte ao catálogo e selecione uma obra.";
        return;
    }

    const nome = document.querySelector("#titulo-obra");
    nome.textContent = titulo.titulo;

    document.title = `${titulo.titulo} | WhatToFlick`;

    const poster = document.querySelector("#detalhe-poster");
    poster.src = titulo.poster ||
        "https://placehold.co/300x450?text=Sem+poster";
    poster.alt = `Pôster de ${titulo.titulo}`;

    adicionarInformacao(
        "Tipo",
        titulo.tipo === "filme" ? "Filme" : "Série"
    );

    adicionarInformacao("Ano de lançamento", titulo.ano);

    adicionarInformacao(
        "Gênero",
        titulo.generoTexto || titulo.genero
    );

    if (titulo.nota !== undefined && titulo.nota !== "") {
        adicionarInformacao(
            "Sua nota",
            `${Number(titulo.nota).toFixed(1).replace(".", ",")}/10`
        );
    }

    adicionarInformacao("Direção ou criação", titulo.direcao);

    if (titulo.duracao) {
        adicionarInformacao(
            "Duração",
            `${titulo.duracao} minutos`
        );
    }

    const classificacoes = {
        livre: "Livre",
        "10": "10 anos",
        "12": "12 anos",
        "14": "14 anos",
        "16": "16 anos",
        "18": "18 anos"
    };

    if (titulo.classificacao) {
        adicionarInformacao(
            "Classificação indicativa",
            classificacoes[titulo.classificacao] ||
                titulo.classificacao
        );
    }

    document.querySelector("#detalhe-sinopse").textContent =
        titulo.sinopse || "Sinopse não informada.";

    const avaliacao = titulo["avaliacao-pessoal"];

    if (avaliacao) {
        const container = document.querySelector("#detalhe-avaliacao");

        const subtitulo = document.createElement("h3");
        subtitulo.textContent = "Sua avaliação";

        const texto = document.createElement("p");
        texto.textContent = avaliacao;

        container.append(subtitulo, texto);
    }

    document.querySelector("#link-editar").href =
        `cadastro.html?id=${encodeURIComponent(titulo.id)}`;
}

mostrarDetalhes();