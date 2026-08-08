const prompt = require("prompt-sync")({ sigint: true });

// ===================== RF09 / RF10 — Classes e herança =====================

class Conteudo {
  constructor(id, titulo, tipo, generos, duracaoMinutos) {
    this.id = id;
    this.titulo = titulo;
    this.tipo = tipo;
    this.generos = generos;
    this.duracaoMinutos = duracaoMinutos;
  }

  // RF11 — uso do this
  exibirResumo() {
    return `${this.titulo} (${this.tipo}) — ${this.duracaoMinutos} min — Gêneros: ${this.generos.join(", ")}`;
  }
}

class Filme extends Conteudo {
  constructor(id, titulo, generos, duracaoMinutos) {
    super(id, titulo, "Filme", generos, duracaoMinutos);
  }
}

class Serie extends Conteudo {
  constructor(id, titulo, generos, duracaoMinutos, temporadas) {
    super(id, titulo, "Série", generos, duracaoMinutos);
    this.temporadas = temporadas;
  }

  exibirTemporadas() {
    return `${this.titulo} tem ${this.temporadas} temporada${this.temporadas > 1 ? "s" : ""}`;
  }

  exibirResumo() {
    return `${super.exibirResumo()} — ${this.temporadas} temporada(s)`;
  }
}

// ===================== RF01 — Perfil da pessoa usuária =====================

function coletarPerfil() {
  console.log("\n===== Bem-vindo(a) ao CineMatch JS =====");

  const nome = prompt("Qual é o seu nome? ");
  const idade = Number(prompt("Qual é a sua idade? "));
  const generosInput = prompt(
    "Quais gêneros você mais gosta? (separe por vírgula, ex: Ação, Comédia, Terror): "
  );

  const generosFavoritos = generosInput
    .split(",")
    .map((genero) => genero.trim())
    .filter((genero) => genero.length > 0);

  return { nome, idade, generosFavoritos };
}

// ===================== RF02 — Catálogo de conteúdos =====================

const catalogo = [
  new Filme(1, "Operação Fênix", ["Ação", "Aventura"], 118),
  new Serie(2, "Trapaça em Alto Astral", ["Ação", "Comédia", "Aventura"], 42, 2),
  new Filme(3, "Corações em Rota", ["Comédia", "Romance"], 96),
  new Serie(4, "Trilha Perdida", ["Aventura", "Drama"], 48, 2),
  new Serie(5, "Sombra na Névoa", ["Ação", "Terror", "Suspense"], 44, 3),
  new Filme(6, "Silêncio na Mansão", ["Terror", "Suspense"], 109),
];

// ===================== RF13 — Closure =====================

function criarContadorDeRecomendacoes() {
  let total = 0;

  return function () {
    total++;
    return total;
  };
}

const contarAnalise = criarContadorDeRecomendacoes();

// ===================== RF03 / RF04 / RF05 — Compatibilidade =====================

function classificarCompatibilidade(percentual) {
  if (percentual >= 80) {
    return "Alta afinidade";
  } else if (percentual >= 50) {
    return "Média afinidade";
  } else {
    return "Baixa afinidade";
  }
}

// remove acentos antes de comparar, já que nem sempre o terminal permite digitar "ç"/"ã" etc.
function normalizarTexto(texto) {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

function calcularCompatibilidade(usuario, conteudo) {
  const generosUsuarioLower = new Set(usuario.generosFavoritos.map((g) => normalizarTexto(g)));

  const generosComuns = conteudo.generos.filter((g) => generosUsuarioLower.has(normalizarTexto(g)));
  const generosNaoExplorados = conteudo.generos.filter((g) => !generosComuns.includes(g));
  const percentual = Math.round((generosComuns.length / conteudo.generos.length) * 100);
  const classificacao = classificarCompatibilidade(percentual);
  const gostaDeTodosOsGeneros = conteudo.generos.every((g) => generosUsuarioLower.has(normalizarTexto(g)));

  return { conteudo, percentual, generosComuns, generosNaoExplorados, classificacao, gostaDeTodosOsGeneros };
}

function obterMelhorCompatibilidade(usuario, catalogo) {
  const resultados = catalogo.map((conteudo) => calcularCompatibilidade(usuario, conteudo));

  return resultados.reduce((maisCompativel, atual) =>
    atual.percentual > maisCompativel.percentual ? atual : maisCompativel
  );
}

function buscarConteudoPorTitulo(catalogo, titulo) {
  return catalogo.find((conteudo) => normalizarTexto(conteudo.titulo) === normalizarTexto(titulo));
}

// ===================== RF14 — Promise / async-await =====================

function buscarCatalogoSimulado() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(catalogo);
    }, 1000);
  });
}

// ===================== RF12 — Callback =====================

function finalizarOnboarding(nomeUsuario, callback) {
  console.log("\nOnboarding finalizado.");
  callback(nomeUsuario);
}

function exibirMensagemFinal(nome) {
  console.log(`${nome}, aproveite sua maratona! Bom streaming.`);
}

// ===================== Funções de exibição =====================

function exibirPerfil(usuario) {
  console.log("\n----- Seu perfil -----");
  console.log(`Nome: ${usuario.nome}`);
  console.log(`Idade: ${usuario.idade}`);
  console.log(`Gêneros favoritos: ${usuario.generosFavoritos.join(", ")}`);
}

function exibirCatalogo(catalogo) {
  console.log("\n----- Catálogo completo -----");
  for (const conteudo of catalogo) {
    console.log(`- ${conteudo.exibirResumo()}`);
  }
}

// RF03 / RF04 / RF05 / RF08 (map, filter)
function calcularCompatibilidades(usuario, catalogo) {
  const resultados = catalogo.map((conteudo) => calcularCompatibilidade(usuario, conteudo));

  console.log("\n----- Compatibilidade com o catálogo -----");
  resultados.forEach((resultado) => {
    console.log(`\nTítulo: ${resultado.conteudo.titulo}`);
    console.log(`Tipo: ${resultado.conteudo.tipo}`);
    console.log(`Compatibilidade: ${resultado.percentual}%`);
    console.log(
      `Gêneros em comum: ${
        resultado.generosComuns.length > 0 ? resultado.generosComuns.join(", ") : "nenhum"
      }`
    );
    console.log(`Classificação: ${resultado.classificacao}`);

    if (resultado.generosNaoExplorados.length > 0) {
      console.log(`Para "${resultado.conteudo.titulo}", você ainda não explorou:`);
      resultado.generosNaoExplorados.forEach((genero) => console.log(`- ${genero}`));
    } else {
      console.log(`Você já curte todos os gêneros de "${resultado.conteudo.titulo}"!`);
    }
  });

  const altaAfinidade = resultados.filter((r) => r.classificacao === "Alta afinidade");
  console.log(`\nVocê tem ${altaAfinidade.length} conteúdo(s) com alta afinidade no catálogo.`);
  console.log(`Esta é a sua análise número ${contarAnalise()}.`);

  return resultados;
}

// RF06 (reduce)
function exibirRecomendacaoPrincipal(usuario, catalogo) {
  const melhor = obterMelhorCompatibilidade(usuario, catalogo);

  console.log("\n----- Recomendação principal -----");
  console.log(melhor.conteudo.exibirResumo());
  console.log(`Compatibilidade: ${melhor.percentual}%`);
  console.log(`Esta é a sua análise número ${contarAnalise()}.`);
}

// RF07
function exibirRecomendacaoPersonalizada(usuario, catalogo) {
  const melhor = obterMelhorCompatibilidade(usuario, catalogo);

  console.log(`\nRecomendação personalizada para ${usuario.nome}:`);

  if (melhor.generosComuns.length > 0 && melhor.generosNaoExplorados.length > 0) {
    console.log(
      `Você já curte ${melhor.generosComuns.join(", ")} — que tal arriscar um pouco de ${melhor.generosNaoExplorados.join(", ")}?`
    );
  } else if (melhor.generosNaoExplorados.length === 0) {
    console.log(`Você já curte todos os gêneros de "${melhor.conteudo.titulo}"!`);
  } else {
    console.log(
      `"${melhor.conteudo.titulo}" tem gêneros bem diferentes do que você costuma assistir — pode ser uma boa surpresa!`
    );
  }

  console.log(`"${melhor.conteudo.titulo}" pode ser um ótimo próximo título.`);
  console.log(`Esta é a sua análise número ${contarAnalise()}.`);
}

// ===================== RF15 — Menu interativo =====================

function exibirMenu(usuario, catalogo) {
  let opcao;

  do {
    console.log("\n===== CineMatch JS =====");
    console.log("1 - Ver meu perfil");
    console.log("2 - Ver catálogo completo");
    console.log("3 - Calcular compatibilidade com todos os conteúdos");
    console.log("4 - Ver o conteúdo mais recomendado");
    console.log("5 - Ver recomendação personalizada");
    console.log("6 - Buscar um conteúdo pelo título");
    console.log("7 - Sair");

    opcao = prompt("Escolha uma opção: ");

    switch (opcao) {
      case "1":
        exibirPerfil(usuario);
        break;
      case "2":
        exibirCatalogo(catalogo);
        break;
      case "3":
        calcularCompatibilidades(usuario, catalogo);
        break;
      case "4":
        exibirRecomendacaoPrincipal(usuario, catalogo);
        break;
      case "5":
        exibirRecomendacaoPersonalizada(usuario, catalogo);
        break;
      case "6": {
        const tituloBusca = prompt("Digite o título do conteúdo que deseja buscar: ");
        const encontrado = buscarConteudoPorTitulo(catalogo, tituloBusca);
        encontrado
          ? console.log(`\nEncontrado: ${encontrado.exibirResumo()}`)
          : console.log("\nNenhum conteúdo encontrado com esse título.");
        break;
      }
      case "7":
        console.log("\nAté a próxima maratona!");
        break;
      default:
        console.log("\nOpção inválida, tente novamente.");
    }
  } while (opcao !== "7");
}

// ===================== Fluxo principal =====================

async function iniciarSistema() {
  const usuario = coletarPerfil();

  console.log("\nCarregando catálogo...");
  const catalogoCarregado = await buscarCatalogoSimulado();
  console.log("Catálogo carregado com sucesso!");

  finalizarOnboarding(usuario.nome, exibirMensagemFinal);

  exibirMenu(usuario, catalogoCarregado);
}

iniciarSistema();
