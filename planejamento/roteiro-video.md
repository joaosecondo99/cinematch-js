# Roteiro do vídeo — CineMatch JS

Tempo total alvo: **4min30 a 5min**. Grave na horizontal ou vertical, com boa
iluminação, rosto visível e áudio claro. Tenha o terminal (VS Code) e o
GitHub já abertos em outra janela/aba antes de começar a gravar.

---

## 1. Abertura + objetivo do sistema (até ~0:45)

> "Oi, eu sou o João e esse é o CineMatch JS, meu mini-projeto do Módulo 01
> da trilha de Mobile React Native. É um motor de recomendação de streaming
> simplificado: ele roda no terminal, faz algumas perguntas sobre o meu
> perfil — nome, idade e os gêneros que eu mais gosto — e compara isso com
> um catálogo de filmes e séries fictícios, calculando um percentual de
> compatibilidade com cada um e recomendando o que eu deveria assistir."

**Ação:** mostrar a tela do editor com o `cinematch.js` aberto por 2-3
segundos, rolando rapidamente para dar uma visão geral do tamanho/estrutura
do arquivo.

## 2. Como executar (até ~1:15)

> "Para rodar, é só ter o Node.js instalado, clonar o repositório, rodar
> `npm install` para instalar a dependência prompt-sync, e depois
> `node cinematch.js`."

**Ação:** abrir o terminal integrado do VS Code e digitar os comandos (pode
cortar a espera do `npm install` se já estiver instalado).

## 3. Demonstração de funcionamento (até ~2:45) — a parte mais importante

**Ação:** rodar `node cinematch.js` ao vivo e:

1. Responder nome, idade e 2-3 gêneros (ex: "Ação, Terror").
2. Mostrar o catálogo carregando (Promise/async-await com o delay de 1s) —
   comente rapidamente: "aqui o sistema está simulando uma busca no servidor
   com Promise e async/await, como se fosse uma chamada real de API".
3. No menu, escolher a opção **3** (calcular compatibilidade com todos os
   conteúdos) e comentar o resultado: percentual, gêneros em comum, gêneros
   não explorados e a classificação (Alta/Média/Baixa afinidade).
4. Escolher a opção **4** (conteúdo mais recomendado) e depois a **5**
   (recomendação personalizada), mostrando a mensagem sugerindo o próximo
   gênero a explorar.
5. Opcional, se sobrar tempo: opção **6** (buscar por título) e opção **1**
   (ver perfil).
6. Sair com a opção **7**.

> "Reparem que a cada análise ele conta quantas vezes eu já pedi uma
> recomendação nessa sessão — isso é uma closure guardando esse número na
> memória, sem eu precisar de uma variável global."

## 4. Organização das tarefas antes de começar (até ~3:15)

> "Antes de codar, eu quebrei o desafio nos requisitos funcionais do
> enunciado — RF01 até RF15 — e organizei isso num quadro Kanban com as
> colunas Backlog, A Fazer, Em Andamento e Concluído. Comecei pela coleta de
> perfil e o catálogo, depois fui para o cálculo de compatibilidade, e só
> por último entrei em classes, herança, closures e Promises, porque essas
> partes dependiam da lógica de compatibilidade já estar pronta."

**Ação:** mostrar rapidamente o quadro Kanban (Trello ou o arquivo
`planejamento/tarefas-kanban.md`) na tela.

## 5. Branches criadas e objetivo de cada uma (até ~3:50)

> "Segui um GitFlow simplificado: a `main` fica só com o código estável, a
> `develop` integra tudo antes de ir pra main. Criei quatro branches de
> funcionalidade: `feat/perfil-catalogo` para a coleta do perfil e o
> catálogo, `feat/calculo-compatibilidade` para o cálculo, classificação e
> recomendações, `feat/classes-poo` para as classes, herança, closure,
> callback, Promise e o menu interativo, e `docs/readme-video` para a
> documentação final."

**Ação:** mostrar a tela do GitHub com a lista de branches e/ou o histórico
de commits (`git log --oneline --graph --all` no terminal fica bem visual).

## 6. O que poderia melhorar (até ~4:30)

> "Se eu fosse continuar esse projeto, eu adicionaria validação mais forte
> de entrada — por exemplo, tratar quando a pessoa digita uma idade que não
> é um número, ou um gênero que não existe em nenhum conteúdo do catálogo.
> Também gostaria de persistir o perfil da pessoa usuária num arquivo JSON
> entre execuções, em vez de perguntar tudo de novo toda vez, e futuramente
> conectar com uma API de streaming real ao invés do catálogo simulado com
> Promise."

## 7. Encerramento (até ~5:00)

> "Esse foi o CineMatch JS. O código completo está no repositório do GitHub
> linkado na descrição, junto com o quadro Kanban. Obrigado por assistir!"

---

### Checklist rápido antes de gravar

- [ ] Terminal com fonte grande o suficiente para ler na gravação
- [ ] Repositório GitHub aberto em uma aba
- [ ] Quadro Kanban aberto em outra aba
- [ ] Testar o fluxo uma vez antes de gravar, para não travar ao vivo
- [ ] Verificar áudio e iluminação
- [ ] Após gravar: subir no Google Drive (link público "qualquer pessoa
      com o link") ou YouTube não listado, e colar o link no README e no AVA
