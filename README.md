# Trilha — React na prática

Aplicação educativa para explorar aulas de React e acompanhar o progresso de estudo. O projeto reúne os seis componentes visuais da atividade em uma experiência funcional, com conteúdo em português, CSS puro e estado compartilhado pela Context API.

São 12 aulas com explicação, exemplo de código e desafio. Os exemplos exibidos nas aulas são material de leitura: não há editor de código ou execução de exercícios dentro da aplicação.

## Executar no computador

Requisitos: Node.js **22.12 ou superior**, npm e um navegador atual. Na pasta do projeto, execute:

```bash
npm ci
npm run dev
```

Abra o endereço informado no terminal, normalmente `http://localhost:5173`. Para encerrar o servidor, use `Ctrl+C` no terminal.

Para gerar e conferir a versão de produção:

```bash
npm run build
npm run preview
```

O build gera a pasta `dist`. A prévia de produção usa o endereço informado no terminal, normalmente `http://localhost:4173`.

## GitHub Codespaces — exigência da atividade

O projeto inclui `.devcontainer/devcontainer.json`, com Node.js 22, instalação das dependências, extensão de português do VS Code e encaminhamento da porta 5173. **Ambiente criado e aplicação compilada e executada no GitHub Codespaces em 08/11/2026.**

1. Abra o [repositório privado GS-Chaves/trilha-react-atividade-2026-2](https://github.com/GS-Chaves/trilha-react-atividade-2026-2) conectado à sua conta GS-Chaves.
2. Abra o [Codespace preparado](https://symmetrical-parakeet-pxp74qw45x9hxwr.github.dev/). Também é possível encontrá-lo em **Code → Codespaces** no repositório.
3. Se o ambiente estiver parado, aguarde sua retomada e execute `npm run dev` no terminal.
4. Abra a aba **Ports/Portas** e use **Open in Browser/Abrir no navegador** na porta **5173**. A [aplicação no Codespaces](https://symmetrical-parakeet-pxp74qw45x9hxwr-5173.app.github.dev/) exige a sessão autorizada e o servidor em execução.
5. Revise e personalize o código nesse ambiente antes da apresentação.

Para criar outro Codespace a partir do mesmo repositório, use **Code → Codespaces → Create codespace on main**. A configuração instala as dependências com `npm ci`. Caso utilize outro repositório, copie o conteúdo desta pasta para sua raiz, incluindo `package-lock.json` e `.devcontainer`, sem `node_modules`, `dist` ou relatórios de teste.

A configuração de ambiente segue o mecanismo de [dev containers documentado pelo GitHub](https://docs.github.com/en/codespaces/setting-up-your-project-for-codespaces/adding-a-dev-container-configuration/introduction-to-dev-containers).

## Usar a aplicação

- **Todas as aulas:** explore seis aulas por página, procure um assunto e filtre por categoria.
- **Ler uma aula:** abra o conteúdo, leia o exemplo e pratique o desafio. Selecione **Concluir aula** para registrar o avanço.
- **Concluídas:** consulte as aulas já marcadas. Ao abrir uma delas, **Estudar novamente** remove sua marcação.
- **Dúvidas frequentes:** abra as perguntas do acordeão; apenas uma permanece aberta por vez.
- **Progresso:** os indicadores são atualizados ao concluir ou desmarcar uma aula. As notificações informam o resultado da ação.
- **Reiniciar progresso:** use o botão no rodapé e confirme na janela. É possível cancelar e manter as marcações.

O progresso fica no `localStorage`, na chave `trilha:completed:v1`. Os dados pertencem a este navegador e endereço; não há conta, servidor de dados ou sincronização entre dispositivos. Limpar os dados do navegador pode apagar o progresso. Se o armazenamento estiver indisponível, a aplicação informa a situação e mantém as alterações apenas na sessão atual.

## Estrutura e conceitos

```text
src/
  App.js                    Componente principal e organização do Provider
  main.jsx                  Montagem da aplicação
  components/               Componentes visuais e telas
  context/StudyContext.jsx  Progresso, notificações e persistência
  data/lessons.js            Conteúdo das 12 aulas
  data/faqs.js               Perguntas e respostas
```

`App.js` envolve `Dashboard` em `StudyProvider`. Ele usa `createElement`, equivalente JavaScript do JSX, para manter o nome `App.js` solicitado. Os demais componentes usam JSX em arquivos `.jsx`.

| Componente obrigatório | Props principais                            | Estado, hooks e comportamento                                                                                                                           |
| ---------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Accordion.jsx`        | `items` com `id`, `title` e `content`       | `useState` mantém o item aberto; `useId` associa botões e painéis. Abre e fecha com transição.                                                          |
| `Pagination.jsx`       | `currentPage`, `totalPages`, `onPageChange` | O catálogo controla a página com `useState`; o callback muda a página. Anterior/próxima ficam desabilitados nos limites.                                |
| `ProgressBar.jsx`      | `value`, `label`, `showLabel`               | Recebe o valor calculado, limita-o entre 0 e 100 e atualiza o preenchimento e os atributos ARIA.                                                        |
| `Tabs.jsx`             | `items`, `defaultTab`                       | `useState` mantém a aba ativa; `useRef` permite mover o foco por teclado. Cada aba tem seu painel associado.                                            |
| `Dropdown.jsx`         | `label`, `value`, `options`, `onChange`     | `useState` controla a abertura; `useEffect` registra e remove o evento externo. Fecha ao selecionar, clicar fora ou usar Escape.                        |
| `Toast.jsx`            | `notification`, `onDismiss`                 | A mensagem e sua visibilidade vêm do contexto. `useEffect` programa o fechamento em 4,5 segundos e limpa o temporizador anterior; há fechamento manual. |

Exemplo de passagem de dados e callback:

```jsx
<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setPage}
/>
```

No `LessonCatalog`, busca, categoria e página são estados locais. Métodos de arrays selecionam os resultados e recortam seis itens por página. Alterar busca ou categoria retorna à primeira página.

O desafio extra usa **Context API**: `StudyProvider` mantém `completedIds` e a notificação atual; `useStudy` permite consultar e alterar esses valores em componentes como `LessonCard`, `LessonDialog`, `ProgressSummary`, `Sidebar` e `Dashboard`. O percentual é calculado a partir das aulas concluídas, sem duplicar esse dado em outro estado. Um `useEffect` salva as marcações no navegador. Consulte a referência oficial de [createContext e fornecimento de valores aos componentes](https://react.dev/reference/react/createContext).

## Requisitos implementados

O código contempla componentes funcionais, props, estado local, hooks, eventos, os seis componentes exigidos, conteúdo relevante, layout responsivo e estado global com Context API. Usa elementos semânticos, rótulos nos controles, foco visível, relações ARIA e navegação por teclado em abas, menu e janelas.

React e React DOM compõem a aplicação; Vite cuida do desenvolvimento e build. Playwright é usado somente nos testes. Não há biblioteca externa de componentes visuais. Para detalhes da ferramenta de desenvolvimento, consulte o [guia oficial do Vite](https://vite.dev/guide/).

A preparação inicial foi feita localmente; a compilação e a execução também foram validadas no Codespaces. A gravação e o envio do vídeo exigido pelo professor são etapas separadas da implementação do sistema.

## Verificar o funcionamento

Instale as dependências e o navegador de testes e execute:

```bash
npm ci
npx playwright install chromium
npm test
```

Em um ambiente Linux que informe ausência de bibliotecas do navegador, use `npx playwright install --with-deps chromium` para instalar também essas dependências.

Faça também uma revisão manual nas larguras **375 px, 768 px e 1440 px**:

1. Confira títulos, cartões, menu, paginação e janelas, sem conteúdo cortado ou rolagem horizontal da página.
2. Avance e volte nas páginas; confirme os botões desabilitados nos limites.
3. Combine busca e categoria; teste um termo inexistente e a ação **Limpar filtros**.
4. Abra uma aula e conclua-a. Confira barra, contadores, aba **Concluídas** e toast.
5. Recarregue a página e confira a preservação do progresso.
6. Na aba **Dúvidas frequentes**, abra duas perguntas em sequência e confirme que apenas uma fica aberta.
7. Navegue com Tab, Shift+Tab, Enter, Espaço e setas. Use Escape para fechar o menu e a janela da aula.
8. Feche uma notificação manualmente; em outra ação, aguarde o desaparecimento automático.
9. Abra **Reiniciar progresso**, cancele e confira as marcações. Repita e confirme para zerá-las.

### Validação realizada em 08/11/2026

- Compilação de produção aprovada localmente e no GitHub Codespaces.
- 12 testes automatizados aprovados em Chromium, incluindo persistência, teclado, foco, filtros, limites de paginação, confirmação de reinício e larguras 375/768/1440 px.
- Revisão visual de celular, tablet e desktop, sem rolagem horizontal da página.
- Auditoria automatizada de acessibilidade em dez estados (cinco no desktop e cinco no celular), sem violações detectadas após ajustes de contraste. Uma auditoria automática não substitui testes com pessoas e tecnologias assistivas.
- Abertura de aula, conclusão, atualização da barra e notificação verificadas na aplicação executada pelo Codespaces.

Antes da apresentação, confirme que o Codespace está ativo e percorra os componentes com suas próprias palavras.
