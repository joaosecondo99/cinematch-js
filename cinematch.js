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
