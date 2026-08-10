# CineMatch JS

## Sobre o projeto

O CineMatch JS é um simulador interativo de recomendação de streaming.
O sistema conversa com a pessoa usuária pelo terminal, coleta seu perfil
(nome, idade, gêneros favoritos) e compara com um catálogo de filmes e séries.

O projeto mostra:

- percentual de compatibilidade com cada conteúdo;
- gêneros em comum;
- gêneros ainda não explorados;
- conteúdo mais compatível;
- recomendação personalizada;
- busca de conteúdo por título;
- menu interativo para navegar entre as funcionalidades.

## Objetivo

Praticar os principais conceitos do Módulo 01:

- lógica de programação;
- JavaScript;
- tipos de dados;
- condicionais;
- operadores;
- escopo;
- laços de repetição;
- funções;
- arrow functions;
- arrays;
- métodos de array (map, filter, find, every, reduce);
- objetos;
- classes, construtores e herança;
- uso do `this`;
- callbacks;
- closures;
- Promises;
- async/await;
- entrada de dados via terminal (prompt-sync);
- GitHub;
- Kanban.

## Como executar

Este projeto precisa de [Node.js](https://nodejs.org/).

1. Clone o repositório.
2. Rode `npm install` para instalar o `prompt-sync`.
3. Rode `node cinematch.js` (ou `npm start`).
4. Responda as perguntas exibidas no terminal (nome, idade, gêneros favoritos).
5. Use o menu para navegar entre perfil, catálogo, cálculo de compatibilidade,
   recomendação principal, recomendação personalizada, busca por título e saída.

## Estrutura do projeto

```txt
CineMatch-JS/
│
├── cinematch.js
├── package.json
├── README.md
└── planejamento/
    └── tarefas-kanban.md
```

## Como o código está organizado

- **`Conteudo`, `Filme`, `Serie`** — classes que representam o catálogo (POO,
  construtor, herança e uso do `this`). `Filme` e `Serie` estendem `Conteudo`;
  `Serie` sobrescreve `exibirResumo()` reutilizando o método da classe pai com
  `super`.
- **`coletarPerfil()`** — coleta nome, idade e gêneros favoritos via
  `prompt-sync`, retornando um objeto simples `usuario`.
- **`calcularCompatibilidade()`** — compara os gêneros do usuário com os de um
  conteúdo (`filter`, `every`) e calcula o percentual de afinidade.
- **`classificarCompatibilidade()`** — classifica o percentual em Alta, Média
  ou Baixa afinidade usando `if/else`.
- **`obterMelhorCompatibilidade()`** — usa `reduce` para encontrar o conteúdo
  com maior compatibilidade.
- **`buscarConteudoPorTitulo()`** — usa `find` para localizar um conteúdo pelo
  título digitado.
- **`criarContadorDeRecomendacoes()`** — closure que mantém, em memória, quantas
  análises de compatibilidade/recomendação já foram feitas na sessão.
- **`finalizarOnboarding(nome, callback)`** — recebe uma função callback
  (`exibirMensagemFinal`) e a executa ao final da etapa de onboarding.
- **`buscarCatalogoSimulado()`** — retorna uma `Promise` que resolve o
  catálogo depois de 1 segundo, simulando uma busca em um servidor remoto.
- **`iniciarSistema()`** — função `async` que orquestra todo o fluxo: coleta o
  perfil, aguarda (`await`) o catálogo simulado, finaliza o onboarding e abre
  o menu.
- **`exibirMenu()`** — laço `do-while` combinado com `switch-case` que mantém
  o menu ativo até a pessoa usuária escolher a opção "Sair".

## Como a internet funciona (resumo)

Quando um dispositivo acessa a internet, ele envia requisições através de uma
rede de computadores interligados, usando protocolos como TCP/IP e HTTP. Cada
computador ou serviço tem um endereço (IP) que permite que os dados sejam
roteados até o destino correto, passando por diversos roteadores até chegar
ao servidor que hospeda a informação solicitada.

## Arquitetura cliente-servidor (resumo)

Na arquitetura cliente-servidor, o **cliente** (por exemplo, um app de
streaming) faz uma requisição e o **servidor** processa essa requisição e
devolve uma resposta (os dados do catálogo, por exemplo). Como essa
comunicação não é instantânea — depende de rede, processamento e distância —,
o JavaScript trata isso como uma operação assíncrona. Neste projeto, a função
`buscarCatalogoSimulado()` usa uma `Promise` com `setTimeout` para simular
esse tempo de resposta de um servidor, e `iniciarSistema()` usa `async/await`
para esperar essa resposta sem travar o restante do programa.

## `var`, `let` e `const`

Este projeto usa apenas `let` e `const`, nunca `var`. O motivo é que `var` tem
escopo de função (não de bloco), pode ser redeclarada sem erro e sofre
"hoisting" de um jeito que facilita bugs silenciosos — por exemplo, uma
variável `var` declarada dentro de um `if` ou de um loop continua acessível
fora dele. `let` e `const` têm escopo de bloco, o que deixa o comportamento do
código mais previsível: `const` é usado sempre que o valor não deve ser
reatribuído (como `catalogo` e as classes) e `let` é usado apenas quando o
valor precisa mudar (como a variável `opcao` do menu).

## Extensões recomendadas no VS Code

- **ESLint** — ajuda a identificar erros e más práticas no JavaScript.
- **Prettier - Code formatter** — mantém a formatação do código padronizada.
- **GitLens** — facilita visualizar histórico de commits e autoria direto no editor.
- **Code Runner** — permite rodar o script rapidamente durante o desenvolvimento.

## Versionamento

O projeto segue um GitFlow simplificado:

- `main` — versão estável do projeto.
- `develop` — integração das funcionalidades antes de ir para `main`.
- `feat/perfil-catalogo` — coleta do perfil (RF01) e catálogo de conteúdos (RF02).
- `feat/calculo-compatibilidade` — cálculo de compatibilidade, classificação e
  recomendações (RF03–RF07).
- `feat/classes-poo` — classes `Conteudo`, `Filme`, `Serie`, herança, closure,
  callback, Promise/async-await e menu interativo (RF08–RF15).
- `docs/readme-video` — documentação (README) e link do vídeo de demonstração.

## Kanban

O quadro de tarefas está em [`planejamento/tarefas-kanban.md`](planejamento/tarefas-kanban.md) e também no Trello.

> Link do quadro Kanban (Trello): https://trello.com/b/zgs9Bwdl

## Links

- Repositório: https://github.com/joaosecondo99/cinematch-js
- Quadro Kanban (Trello): https://trello.com/b/zgs9Bwdl

## Autor

João Pereira
