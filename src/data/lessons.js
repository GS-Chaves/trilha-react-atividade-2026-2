// Dados separados da apresentação: cada cartão e aula recebe estes valores por props.
export const lessons = [
  {
    id: 1,
    title: "Primeiros passos com JSX",
    description: "Combine marcação e JavaScript para descrever a interface.",
    category: "Fundamentos",
    minutes: 8,
    icon: "code",
    content: [
      "JSX é uma sintaxe que permite escrever uma estrutura parecida com HTML dentro do JavaScript. O React usa essa descrição para construir e atualizar a interface.",
      "Use chaves para inserir expressões JavaScript. Em JSX, className define a classe CSS, as tags precisam ser fechadas e os elementos retornados devem estar envolvidos por um único elemento ou fragmento.",
    ],
    example: `export default function BoasVindas() {
  const nome = 'Estudante';

  return (
    <section className="boas-vindas">
      <h1>Olá, {nome}!</h1>
      <p>Vamos aprender React?</p>
    </section>
  );
}`,
    challenge:
      "Altere o nome e acrescente um parágrafo com seu objetivo de estudo.",
  },
  {
    id: 2,
    title: "Pensando em componentes",
    description:
      "Divida uma tela em pequenas partes que podem ser reutilizadas.",
    category: "Fundamentos",
    minutes: 10,
    icon: "layers",
    content: [
      "Um componente funcional é uma função JavaScript que retorna a descrição de uma parte da interface. Seu nome começa com letra maiúscula para que o React o diferencie de uma tag HTML.",
      "Separar cabeçalho, cartão de aula e barra de progresso torna o projeto mais fácil de ler e manter. O componente principal, App, organiza essas peças para formar a página.",
    ],
    example: `function Cabecalho() {
  return <header><h1>Minha trilha</h1></header>;
}

export default function App() {
  return (
    <>
      <Cabecalho />
      <main>Seu conteúdo começa aqui.</main>
    </>
  );
}`,
    challenge:
      "Crie um componente Rodape e utilize-o abaixo do conteúdo principal.",
  },
  {
    id: 3,
    title: "Compartilhando dados com props",
    description:
      "Reutilize um componente com títulos, valores e ações diferentes.",
    category: "Fundamentos",
    minutes: 9,
    icon: "box",
    content: [
      "Props são os dados que um componente recebe de seu componente pai. Elas permitem usar a mesma estrutura visual com conteúdos diferentes, como acontece nos cartões desta trilha.",
      "O componente que recebe uma prop deve tratá-la como somente leitura. Para solicitar uma mudança ao pai, ele pode chamar uma função recebida por prop, também chamada de callback.",
    ],
    example: `function Cartao({ titulo, minutos, onAbrir }) {
  return (
    <article>
      <h2>{titulo}</h2>
      <p>{minutos} minutos</p>
      <button onClick={onAbrir}>Estudar</button>
    </article>
  );
}

// Exemplo de uso dentro de outro componente:
// <Cartao titulo="JSX" minutos={8} onAbrir={abrirAula} />`,
    challenge: "Acrescente a prop categoria e mostre seu valor no cartão.",
  },
  {
    id: 4,
    title: "Sua primeira mudança de estado",
    description:
      "Use useState para transformar uma tela estática em interativa.",
    category: "Fundamentos",
    minutes: 12,
    icon: "sparkles",
    content: [
      "O estado representa informações que mudam durante o uso da aplicação. O hook useState retorna o valor atual e uma função que solicita sua atualização e uma nova renderização.",
      "Quando o próximo valor depende do anterior, prefira a forma de atualização que recebe uma função. Hooks devem ser chamados no nível superior do componente, fora de condições e repetições.",
    ],
    example: `import { useState } from 'react';

export default function Contador() {
  const [quantidade, setQuantidade] = useState(0);

  return (
    <button onClick={() => setQuantidade(atual => atual + 1)}>
      Sessões de estudo: {quantidade}
    </button>
  );
}`,
    challenge: "Adicione um botão que zere o contador.",
  },
  {
    id: 5,
    title: "Respondendo aos eventos",
    description: "Faça a interface reagir a cliques e alterações nos campos.",
    category: "Interatividade",
    minutes: 10,
    icon: "cursor",
    content: [
      "Eventos conectam ações do usuário ao código. Em React, onClick recebe uma função para executar quando um botão é acionado, enquanto onChange acompanha mudanças em um campo.",
      "Um campo controlado usa o estado como fonte de seu valor. No exemplo, cada alteração atualiza a busca e a interface mostra imediatamente o texto digitado.",
    ],
    example: `import { useState } from 'react';

export default function Busca() {
  const [busca, setBusca] = useState('');

  return (
    <>
      <label htmlFor="busca">Buscar aula</label>
      <input id="busca" value={busca}
        onChange={evento => setBusca(evento.target.value)} />
      <p>Você buscou: {busca}</p>
    </>
  );
}`,
    challenge: "Adicione um botão Limpar que deixe o campo vazio.",
  },
  {
    id: 6,
    title: "Do array para a tela",
    description: "Renderize listas e filtre conteúdos com métodos de arrays.",
    category: "Interatividade",
    minutes: 11,
    icon: "layers",
    content: [
      "O método map transforma cada item de um array em um elemento da interface. Cada elemento da lista precisa de uma key estável e única entre seus irmãos; um identificador do dado costuma ser a melhor escolha.",
      "Use filter para selecionar os itens desejados antes de renderizá-los. Para paginação, slice recorta os resultados de acordo com a página atual e o número de itens por página.",
    ],
    example: `const aulas = [
  { id: 1, titulo: 'JSX', concluida: true },
  { id: 2, titulo: 'Componentes', concluida: false },
];

export default function Pendencias() {
  const pendentes = aulas.filter(aula => !aula.concluida);

  return (
    <ul>
      {pendentes.map(aula => <li key={aula.id}>{aula.titulo}</li>)}
    </ul>
  );
}`,
    challenge: "Mostre também a quantidade de aulas pendentes acima da lista.",
  },
  {
    id: 7,
    title: "Efeitos com useEffect",
    description:
      "Sincronize o componente com temporizadores e recursos externos.",
    category: "Interatividade",
    minutes: 13,
    icon: "sparkles",
    content: [
      "useEffect permite sincronizar um componente com algo externo ao React, como um temporizador, o armazenamento do navegador ou um evento do documento. As dependências indicam quais mudanças exigem executar o efeito novamente.",
      "Quando o efeito registra um evento ou inicia um temporizador, retorne uma função de limpeza. Ela desfaz o trabalho anterior quando necessário e evita manter recursos ativos depois que o componente sai da tela.",
    ],
    example: `import { useEffect, useState } from 'react';

export default function Aviso() {
  const [visivel, setVisivel] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisivel(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  return visivel ? <p role="status">Progresso atualizado!</p> : null;
}`,
    challenge:
      "Altere o tempo do aviso e explique por que clearTimeout é usado.",
  },
  {
    id: 8,
    title: "Uma interface, vários estados",
    description: "Mostre o conteúdo certo com renderização condicional.",
    category: "Interatividade",
    minutes: 9,
    icon: "layout",
    content: [
      "A interface pode mudar de acordo com o estado ou as props. Condições, operador ternário e operador lógico && permitem escolher quais elementos serão renderizados.",
      "Pense também nos estados vazios: uma busca sem resultado precisa de uma explicação e de um caminho para continuar. A mensagem ajuda o usuário a entender o que aconteceu.",
    ],
    example: `export default function Resultado({ quantidade }) {
  return (
    <section>
      {quantidade > 0 ? (
        <p>{quantidade} aulas encontradas.</p>
      ) : (
        <p>Nenhuma aula encontrada. Tente outra busca.</p>
      )}
    </section>
  );
}`,
    challenge: "Diferencie a mensagem quando houver exatamente uma aula.",
  },
  {
    id: 9,
    title: "Acessibilidade desde o início",
    description: "Use semântica, rótulos e teclado para incluir mais pessoas.",
    category: "Aplicação",
    minutes: 12,
    icon: "check",
    content: [
      "HTML semântico comunica o propósito do conteúdo: main identifica a área principal, nav agrupa navegação e button representa uma ação. Um botão nativo já pode ser acionado pelo teclado.",
      "Associe rótulos aos campos, mantenha o foco visível e use atributos ARIA quando for preciso comunicar um comportamento. Em um acordeão, aria-expanded informa se a seção está aberta e aria-controls aponta para o painel controlado.",
    ],
    example: `import { useState } from 'react';

export default function Ajuda() {
  const [aberto, setAberto] = useState(false);

  return (
    <section>
      <button aria-expanded={aberto} aria-controls="resposta"
        onClick={() => setAberto(atual => !atual)}>
        Como começar?
      </button>
      <p id="resposta" hidden={!aberto}>Escolha a primeira aula.</p>
    </section>
  );
}`,
    challenge: "Teste a abertura e o fechamento usando apenas Tab e Enter.",
  },
  {
    id: 10,
    title: "Layouts que se adaptam",
    description: "Organize a mesma interface no celular, tablet e desktop.",
    category: "Aplicação",
    minutes: 11,
    icon: "globe",
    content: [
      "Um layout responsivo se adapta ao espaço disponível, preservando a leitura e o acesso às ações. Comece com uma coluna e aumente o número de colunas conforme houver espaço.",
      "CSS Grid, medidas flexíveis e media queries ajudam nessa adaptação. Teste também títulos longos, menus abertos e o foco do teclado para encontrar problemas que uma tela estática pode esconder.",
    ],
    example: `.lista-aulas {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 700px) {
  .lista-aulas {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1100px) {
  .lista-aulas {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}`,
    challenge: "Confira o layout nas larguras de 390, 768 e 1440 pixels.",
  },
  {
    id: 11,
    title: "Estado compartilhado com Context",
    description: "Conecte componentes distantes a uma fonte comum de dados.",
    category: "Aplicação",
    minutes: 14,
    icon: "box",
    content: [
      "Context API permite compartilhar um valor com vários componentes descendentes sem repassá-lo manualmente por todas as camadas. Um Provider fornece o valor e useContext permite que um componente o leia.",
      "Neste projeto, o progresso precisa aparecer em diferentes partes da tela. Um contexto pode reunir as aulas concluídas e as funções que alteram essa lista; cada componente consumidor recebe os mesmos dados atualizados.",
    ],
    example: `import { createContext, useContext, useState } from 'react';

const ProgressoContext = createContext(null);

export function ProgressoProvider({ children }) {
  const [concluidas, setConcluidas] = useState([]);
  return (
    <ProgressoContext.Provider value={{ concluidas, setConcluidas }}>
      {children}
    </ProgressoContext.Provider>
  );
}

export function Resumo() {
  const { concluidas } = useContext(ProgressoContext);
  return <p>{concluidas.length} aulas concluídas.</p>;
}`,
    challenge:
      "Explique por que Resumo precisa estar dentro de ProgressoProvider.",
  },
  {
    id: 12,
    title: "Conectando todas as peças",
    description: "Revise o fluxo completo e dê os últimos cuidados ao projeto.",
    category: "Aplicação",
    minutes: 15,
    icon: "check",
    content: [
      "Uma aplicação nasce da colaboração entre os componentes. Ao concluir uma aula, o evento atualiza o estado compartilhado, os indicadores recebem novos valores e uma notificação confirma a ação.",
      "Antes de apresentar, percorra os fluxos completos: filtre aulas, navegue entre páginas, troque de aba, expanda dúvidas e atualize o progresso. Confira o teclado, as diferentes larguras e o que acontece após recarregar a página.",
    ],
    example: `function concluirAula(id) {
  setConcluidas(atuais =>
    atuais.includes(id) ? atuais : [...atuais, id]
  );
  mostrarNotificacao('Aula concluída!', 'success');
}

// O progresso é calculado a partir dos dados, sem estado duplicado:
const progresso = Math.round(
  (concluidas.length / aulas.length) * 100
);`,
    challenge:
      "Descreva o caminho do clique até a atualização da barra de progresso.",
  },
];
