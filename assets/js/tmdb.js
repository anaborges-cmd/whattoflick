
const TMDB_PROXY_URL = "https://whattoflick-tmdb-proxy.alupborges.workers.dev/search";
const TMDB_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGEM = "https://image.tmdb.org/t/p/w500";

const campoBuscaTMDB = document.querySelector("#busca-tmdb");
const botaoBuscaTMDB = document.querySelector("#botao-busca-tmdb");
const resultadosTMDB = document.querySelector("#resultados-tmdb");
const mensagemTMDB = document.querySelector("#mensagem-tmdb");

async function buscarNoTMDB() {
    const pesquisa = campoBuscaTMDB.value.trim();

    if (!pesquisa) {
        mensagemTMDB.textContent = "Digite um filme ou série para pesquisar.";
        return;
    }

    mensagemTMDB.textContent = "Buscando títulos...";
    resultadosTMDB.replaceChildren();
    botaoBuscaTMDB.disabled = true;

    try {
    const parametros = new URLSearchParams({
    query: pesquisa
});

    const resposta = await fetch(
    `${TMDB_PROXY_URL}?${parametros.toString()}`
);

        if (!resposta.ok) {
            throw new Error(`Erro HTTP ${resposta.status}`);
        }

        const dados = await resposta.json();

        const obras = dados.results
            .filter(item =>
                item.media_type === "movie" ||
                item.media_type === "tv"
            )
            .slice(0, 8);

        if (obras.length === 0) {
            mensagemTMDB.textContent = "Nenhum título encontrado.";
            return;
        }

        mensagemTMDB.textContent =
            `${obras.length} resultado(s) encontrado(s).`;

        obras.forEach(obra => {
            const artigo = document.createElement("article");

            const titulo = document.createElement("h3");
            titulo.textContent = obra.title || obra.name;

            const descricao = document.createElement("p");
            const data = obra.release_date || obra.first_air_date || "";
            descricao.textContent =
                `${obra.media_type === "movie" ? "Filme" : "Série"} · ${data.slice(0, 4)}`;

            const imagem = document.createElement("img");
            imagem.src = obra.poster_path
                ? TMDB_IMAGEM + obra.poster_path
                : "https://placehold.co/200x300?text=Sem+poster";
            imagem.alt = `Pôster de ${titulo.textContent}`;
            imagem.loading = "lazy";
            imagem.style.width = "120px";

            const botao = document.createElement("button");
            botao.type = "button";
            botao.textContent = "Selecionar título";
            botao.addEventListener("click", () => selecionarObra(obra));

            artigo.append(imagem, titulo, descricao, botao);
            resultadosTMDB.appendChild(artigo);
        });

    } catch (erro) {
        console.error("Erro na busca TMDB:", erro);
        mensagemTMDB.textContent =
            "Não foi possível buscar os títulos. Confira a chave e a conexão.";
    } finally {
        botaoBuscaTMDB.disabled = false;
    }
}

async function selecionarObra(obra) {
    const campo = id => document.getElementById(id);

    campo("titulo").value = obra.title || obra.name || "";
    campo("tipo").value =
        obra.media_type === "movie" ? "filme" : "serie";

    const data = obra.release_date || obra.first_air_date || "";
    campo("ano").value = data ? data.slice(0, 4) : "";

    campo("poster").value = obra.poster_path
        ? TMDB_IMAGEM + obra.poster_path
        : "";

    campo("sinopse").value = obra.overview || "";

    // A nota pessoal permanece para o usuário preencher.
    campo("nota").value = "";

    // Limpa dados que não são fornecidos diretamente pela busca.
    campo("genero").value = "";
    campo("direcao").value = "";
    campo("duracao").value = "";
    campo("classificacao").value = "";
    campo("avaliacao-pessoal").value = "";

    // Converte os gêneros do TMDB para os valores do formulário.
    const mapaGeneros = {
        28: "acao",
        12: "aventura",
        16: "animacao",
        35: "comedia",
        99: "documentario",
        18: "drama",
        14: "fantasia",
        27: "terror",
        878: "ficcao-cientifica",
        53: "suspense",
        10759: "aventura",
        10765: "ficcao-cientifica",
        9648: "suspense"
    };

    const generoEncontrado = (obra.genre_ids || [])
        .map(id => mapaGeneros[id])
        .find(genero => genero);

    campo("genero").value = generoEncontrado || "";

    mensagemTMDB.textContent =
        "Dados importados! Confira os campos e complete o cadastro.";

    campo("titulo").scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}

botaoBuscaTMDB.addEventListener("click", buscarNoTMDB);

campoBuscaTMDB.addEventListener("keydown", evento => {
    if (evento.key === "Enter") {
        evento.preventDefault();
        buscarNoTMDB();
    }
});
