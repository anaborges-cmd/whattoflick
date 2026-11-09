// WhatToFlick — catálogo, filtros e persistência local

const CHAVE_STORAGE = "whattoflick-titulos";

const titulosIniciais = [
    { id: "interestelar", titulo: "Interestelar", tipo: "filme", ano: 2014, genero: "ficcao-cientifica", generoTexto: "Ficção científica", nota: 8.7, poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg", sinopse: "Uma jornada espacial em busca de um futuro para a humanidade.", direcao: "Christopher Nolan" },
    { id: "the-office", titulo: "The Office", tipo: "serie", ano: 2005, genero: "comedia", generoTexto: "Comédia", nota: 9.0, poster: "https://image.tmdb.org/t/p/w500/qWnJzyZhyy74gjpSjIXWmuk0ifX.jpg", sinopse: "O cotidiano cômico dos funcionários de uma empresa de papel.", direcao: "Greg Daniels" },
    { id: "parasita", titulo: "Parasita", tipo: "filme", ano: 2019, genero: "drama", generoTexto: "Drama", nota: 8.5, poster: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg", sinopse: "Uma história de contrastes sociais marcada por reviravoltas.", direcao: "Bong Joon-ho" },
    { id: "the-last-of-us", titulo: "The Last of Us", tipo: "serie", ano: 2023, genero: "aventura", generoTexto: "Aventura", nota: 8.6, poster: "https://media.themoviedb.org/t/p/w600_and_h900_face/qWo5TP7mBijoZrfxBJkUMctkBt0.jpg", sinopse: "Dois sobreviventes atravessam um mundo devastado por uma epidemia.", direcao: "Craig Mazin e Neil Druckmann" }
];

function carregarTitulos() {
    const dadosSalvos = localStorage.getItem(CHAVE_STORAGE);
    if (dadosSalvos === null) {
        localStorage.setItem(CHAVE_STORAGE, JSON.stringify(titulosIniciais));
        return [...titulosIniciais];
    }
    try { return JSON.parse(dadosSalvos); }
    catch (erro) {
        console.error("Não foi possível ler os títulos salvos:", erro);
        localStorage.setItem(CHAVE_STORAGE, JSON.stringify(titulosIniciais));
        return [...titulosIniciais];
    }
}

function salvarTitulos(titulos) {
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(titulos));
}

function criarCard(titulo) {
    const artigo = document.createElement("article");
    const imagem = document.createElement("img");
    imagem.src = titulo.poster || "https://placehold.co/500x750?text=Sem+poster";
    imagem.alt = `Pôster de ${titulo.titulo}`;
    imagem.loading = "lazy";

    const nome = document.createElement("h3");
    nome.textContent = titulo.titulo;
    const tipoAno = document.createElement("p");
    tipoAno.textContent = `${titulo.tipo === "filme" ? "Filme" : "Série"} · ${titulo.ano} · ${titulo.generoTexto || titulo.genero}`;
    const nota = document.createElement("p");
    nota.textContent = `Sua nota: ${Number(titulo.nota).toFixed(1).replace(".", ",")}/10`;
    const sinopse = document.createElement("p");
    sinopse.textContent = titulo.sinopse || "Sinopse não informada.";

    const acoes = document.createElement("p");
    const detalhes = document.createElement("a");
    detalhes.href = `pages/detalhes.html?id=${encodeURIComponent(titulo.id)}`;
    detalhes.textContent = "Ver detalhes";
    const editar = document.createElement("a");
    editar.href = `pages/cadastro.html?id=${encodeURIComponent(titulo.id)}`;
    editar.textContent = "Editar";
    const excluir = document.createElement("button");
    excluir.type = "button";
    excluir.textContent = "Excluir";
    excluir.addEventListener("click", () => excluirTitulo(titulo.id));
    acoes.append(detalhes, editar, excluir);
    artigo.append(imagem, nome, tipoAno, nota, sinopse, acoes);
    return artigo;
}

function renderizarCatalogo() {
    const lista = document.querySelector("#lista-catalogo");
    if (!lista) return;
    const busca = document.querySelector("#busca").value.trim().toLocaleLowerCase("pt-BR");
    const tipo = document.querySelector("#tipo").value;
    const genero = document.querySelector("#genero").value;
    const ano = document.querySelector("#ano").value;
    const notaMinima = Number(document.querySelector("#nota-minima").value || 0);
    const ordenacao = document.querySelector("#ordenacao").value;

    let titulos = carregarTitulos().filter(t =>
        t.titulo.toLocaleLowerCase("pt-BR").includes(busca) &&
        (!tipo || t.tipo === tipo) &&
        (!genero || t.genero === genero) &&
        (!ano || Number(t.ano) === Number(ano)) &&
        Number(t.nota) >= notaMinima
    );

    titulos.sort((a, b) => {
        if (ordenacao === "ano-desc") return b.ano - a.ano;
        if (ordenacao === "ano-asc") return a.ano - b.ano;
        if (ordenacao === "nota-desc") return b.nota - a.nota;
        if (ordenacao === "nota-asc") return a.nota - b.nota;
        return a.titulo.localeCompare(b.titulo, "pt-BR");
    });

    lista.replaceChildren();
    titulos.forEach(t => lista.appendChild(criarCard(t)));
    document.querySelector("#total-titulos").textContent =
        `${titulos.length} ${titulos.length === 1 ? "título encontrado" : "títulos encontrados"}.`;
    if (titulos.length === 0) {
        const mensagem = document.createElement("p");
        mensagem.textContent = "Nenhum título encontrado. Tente alterar os filtros.";
        lista.appendChild(mensagem);
    }
}

function excluirTitulo(id) {
    if (!confirm("Tem certeza de que deseja excluir este título?")) return;
    const atualizados = carregarTitulos().filter(t => t.id !== id);
    salvarTitulos(atualizados);
    renderizarCatalogo();
}

const formularioFiltros = document.querySelector("#filtros-form");
if (formularioFiltros) {
    formularioFiltros.addEventListener("submit", evento => evento.preventDefault());
    formularioFiltros.addEventListener("input", renderizarCatalogo);
    formularioFiltros.addEventListener("change", renderizarCatalogo);
    formularioFiltros.addEventListener("reset", () => setTimeout(renderizarCatalogo));
    renderizarCatalogo();
}
