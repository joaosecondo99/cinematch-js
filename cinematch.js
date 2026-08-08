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
