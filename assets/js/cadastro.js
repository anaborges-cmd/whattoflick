
const CHAVE_STORAGE = "whattoflick-titulos";

const formulario = document.querySelector(".registration-form");
const parametros = new URLSearchParams(window.location.search);
const idEdicao = parametros.get("id");

const nomesGeneros = {
    acao: "Ação",
    aventura: "Aventura",
    comedia: "Comédia",
    drama: "Drama",
    fantasia: "Fantasia",
    "ficcao-cientifica": "Ficção científica",
    suspense: "Suspense",
    terror: "Terror",
    animacao: "Animação",
    documentario: "Documentário"
};

function carregarTitulos() {
    try {
        const dados = JSON.parse(localStorage.getItem(CHAVE_STORAGE));
        return Array.isArray(dados) ? dados : [];
    } catch (erro) {
        console.error("Erro ao carregar títulos:", erro);
        return [];
    }
}

function salvarTitulos(titulos) {
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(titulos));
}

function preencherFormulario(titulo) {
    const campos = [
        "titulo", "tipo", "genero", "ano", "nota",
        "poster", "direcao", "duracao", "classificacao",
        "sinopse", "avaliacao-pessoal"
    ];

    campos.forEach(campo => {
        const elemento = document.getElementById(campo);
        if (elemento) {
            elemento.value = titulo[campo] ?? "";
        }
    });
}

if (idEdicao) {
    const tituloExistente = carregarTitulos().find(
        titulo => titulo.id === idEdicao
    );

    if (tituloExistente) {
        preencherFormulario(tituloExistente);
        document.querySelector("#titulo-pagina").textContent =
            "Editar título";
        document.querySelector('button[type="submit"]').textContent =
            "Salvar alterações";
    } else {
        alert("Título não encontrado.");
        window.location.href = "../index.html";
    }
}

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    if (!formulario.reportValidity()) {
        return;
    }

    const valor = id => document.getElementById(id).value.trim();

    const ano = Number(valor("ano"));
    const nota = Number(valor("nota"));

    if (
        !Number.isInteger(ano) ||
        ano < 1888 ||
        ano > 2026 ||
        !Number.isFinite(nota) ||
        nota < 0 ||
        nota > 10
    ) {
        alert("Confira o ano de lançamento e a nota.");
        return;
    }

    const titulos = carregarTitulos();
    const indiceExistente = idEdicao
        ? titulos.findIndex(titulo => titulo.id === idEdicao)
        : -1;

    if (idEdicao && indiceExistente === -1) {
        alert("Não foi possível encontrar o título para edição.");
        return;
    }

    const titulo = {
        id: idEdicao || crypto.randomUUID(),
        titulo: valor("titulo"),
        tipo: valor("tipo"),
        genero: valor("genero"),
        generoTexto: nomesGeneros[valor("genero")] || valor("genero"),
        ano: ano,
        nota: nota,
        poster: valor("poster"),
        direcao: valor("direcao"),
        duracao: valor("duracao")
            ? Number(valor("duracao"))
            : null,
        classificacao: valor("classificacao"),
        sinopse: valor("sinopse"),
        "avaliacao-pessoal": valor("avaliacao-pessoal")
    };

    if (indiceExistente >= 0) {
        titulos[indiceExistente] = titulo;
    } else {
        titulos.push(titulo);
    }

    try {
        salvarTitulos(titulos);
        alert(
            idEdicao
                ? "Título atualizado com sucesso!"
                : "Título cadastrado com sucesso!"
        );
        window.location.href = "../index.html";
    } catch (erro) {
        console.error("Erro ao salvar título:", erro);
        alert("Não foi possível salvar o título. Tente novamente.");
    }
});
