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
  new Serie(1, "Fronteira Digital", ["Ação", "Ficção Científica"], 45, 2),
  new Filme(2, "Risadas de Sábado", ["Comédia", "Romance"], 98),
  new Filme(3, "Sombras do Porão", ["Terror", "Suspense"], 110),
  new Serie(4, "Corações em Segredo", ["Romance", "Drama"], 40, 3),
  new Filme(5, "Corrida Contra o Tempo", ["Ação", "Suspense"], 105),
];

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

function calcularCompatibilidade(usuario, conteudo) {
  const generosUsuarioLower = new Set(usuario.generosFavoritos.map((g) => g.toLowerCase()));

  const generosComuns = conteudo.generos.filter((g) => generosUsuarioLower.has(g.toLowerCase()));
  const generosNaoExplorados = conteudo.generos.filter((g) => !generosComuns.includes(g));
  const percentual = Math.round((generosComuns.length / conteudo.generos.length) * 100);
  const classificacao = classificarCompatibilidade(percentual);
  const gostaDeTodosOsGeneros = conteudo.generos.every((g) => generosUsuarioLower.has(g.toLowerCase()));

  return { conteudo, percentual, generosComuns, generosNaoExplorados, classificacao, gostaDeTodosOsGeneros };
}

function obterMelhorCompatibilidade(usuario, catalogo) {
  const resultados = catalogo.map((conteudo) => calcularCompatibilidade(usuario, conteudo));

  return resultados.reduce((maisCompativel, atual) =>
    atual.percentual > maisCompativel.percentual ? atual : maisCompativel
  );
}

function buscarConteudoPorTitulo(catalogo, titulo) {
  return catalogo.find((conteudo) => conteudo.titulo.toLowerCase() === titulo.toLowerCase());
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

  return resultados;
}

// RF06 (reduce)
function exibirRecomendacaoPrincipal(usuario, catalogo) {
  const melhor = obterMelhorCompatibilidade(usuario, catalogo);

  console.log("\n----- Recomendação principal -----");
  console.log(melhor.conteudo.exibirResumo());
  console.log(`Compatibilidade: ${melhor.percentual}%`);
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
}
