const prompt = require("prompt-sync")({ sigint: true });

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
  {
    id: 1,
    titulo: "Fronteira Digital",
    tipo: "Série",
    generos: ["Ação", "Ficção Científica"],
    duracaoMinutos: 45,
    temporadas: 2,
  },
  {
    id: 2,
    titulo: "Risadas de Sábado",
    tipo: "Filme",
    generos: ["Comédia", "Romance"],
    duracaoMinutos: 98,
  },
  {
    id: 3,
    titulo: "Sombras do Porão",
    tipo: "Filme",
    generos: ["Terror", "Suspense"],
    duracaoMinutos: 110,
  },
  {
    id: 4,
    titulo: "Corações em Segredo",
    tipo: "Série",
    generos: ["Romance", "Drama"],
    duracaoMinutos: 40,
    temporadas: 3,
  },
  {
    id: 5,
    titulo: "Corrida Contra o Tempo",
    tipo: "Filme",
    generos: ["Ação", "Suspense"],
    duracaoMinutos: 105,
  },
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
    console.log(`- ${conteudo.titulo} (${conteudo.tipo}) — ${conteudo.duracaoMinutos} min`);
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
  console.log(`${melhor.conteudo.titulo} (${melhor.conteudo.tipo})`);
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
