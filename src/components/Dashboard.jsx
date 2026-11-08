import { useState } from "react";
import { lessons } from "../data/lessons.js";
import { faqs } from "../data/faqs.js";
import { useStudy } from "../context/StudyContext.jsx";
import Sidebar from "./Sidebar.jsx";
import ProgressSummary from "./ProgressSummary.jsx";
import Tabs from "./Tabs.jsx";
import Accordion from "./Accordion.jsx";
import Toast from "./Toast.jsx";
import LessonCatalog from "./LessonCatalog.jsx";
import LessonDialog from "./LessonDialog.jsx";
import Modal from "./Modal.jsx";
import Icon from "./Icon.jsx";

function HeroIllustration() {
  return (
    <div className="hero-art" aria-hidden="true">
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <span className="art-spark spark-one">✦</span>
      <span className="art-spark spark-two">✧</span>
      <div className="art-code">
        <span className="art-window-dots">•••</span>
        <Icon name="code" size={62} />
        <div className="art-code-lines">
          <i />
          <i />
          <i />
        </div>
      </div>
      <div className="art-success">
        <span>
          <Icon name="check" size={18} />
        </span>
        <div>
          Um passo de cada vez<strong>Você está evoluindo!</strong>
        </div>
      </div>
      <span className="art-floating">
        <Icon name="layers" size={27} />
      </span>
    </div>
  );
}

export default function Dashboard() {
  const { completedIds, notification, dismissNotification, resetProgress } =
    useStudy();
  const [activeLesson, setActiveLesson] = useState(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const nextLesson =
    lessons.find((lesson) => !completedIds.includes(lesson.id)) || lessons[0];
  const allDone = completedIds.length === lessons.length;
  const tabs = [
    {
      id: "all",
      label: (
        <>
          Todas as aulas <span className="tab-count">12</span>
        </>
      ),
      content: <LessonCatalog key="all" onOpen={setActiveLesson} />,
    },
    {
      id: "completed",
      label: (
        <>
          Concluídas <span className="tab-count">{completedIds.length}</span>
        </>
      ),
      content: (
        <LessonCatalog key="completed" completedOnly onOpen={setActiveLesson} />
      ),
    },
    {
      id: "help",
      label: "Dúvidas frequentes",
      content: (
        <section className="faq-section">
          <div>
            <span className="eyebrow">UMA AJUDA NO CAMINHO</span>
            <h3>Aprender fica mais leve com clareza.</h3>
            <p>Encontre respostas para aproveitar sua trilha.</p>
          </div>
          <Accordion items={faqs} />
        </section>
      ),
    },
  ];

  return (
    <div className="app-shell">
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Sidebar />
      <main id="conteudo" className="main-content">
        <header id="inicio" className="page-header">
          <div>
            <p className="eyebrow">APRENDER É UM CAMINHO</p>
            <h1>
              Que bom ter você por aqui<span>.</span>
            </h1>
            <p>Um novo conhecimento. Um novo passo. Vamos nessa?</p>
          </div>
          <span className="header-chip">
            <span className="status-dot" />
            No seu ritmo
          </span>
        </header>
        <div className="overview-grid">
          <section className="hero-card" aria-labelledby="hero-title">
            <div className="hero-content">
              <span className="hero-badge">
                <Icon name="code" size={15} />
                TRILHA DE DESENVOLVIMENTO
              </span>
              <h2 id="hero-title">
                React na prática<span>Ideias viram interfaces.</span>
              </h2>
              <p>
                Do primeiro componente à sua própria aplicação.
                <br className="desktop-break" /> Aprenda fazendo, uma aula de
                cada vez.
              </p>
              <div className="hero-facts">
                <span>
                  <Icon name="book" size={16} />
                  12 aulas
                </span>
                <span>
                  <Icon name="clock" size={16} />
                  {lessons.reduce(
                    (total, lesson) => total + lesson.minutes,
                    0,
                  )}{" "}
                  min de conteúdo
                </span>
              </div>
              <button
                className="primary-button"
                onClick={() => setActiveLesson(nextLesson)}
              >
                {allDone
                  ? "Revisitar a trilha"
                  : completedIds.length
                    ? "Continuar aprendendo"
                    : "Começar a aprender"}
                <Icon name="arrow" size={18} />
              </button>
            </div>
            <HeroIllustration />
          </section>
          <ProgressSummary />
        </div>
        <section
          id="minha-trilha"
          className="learning-section"
          aria-labelledby="learning-title"
        >
          <div className="section-heading">
            <div>
              <h2 id="learning-title">Sua próxima descoberta</h2>
              <p>Explore os conteúdos e construa seu conhecimento.</p>
            </div>
            <span className="course-label">
              <Icon name="layers" size={16} />
              Uma trilha, muitas possibilidades
            </span>
          </div>
          <Tabs items={tabs} defaultTab="all" />
        </section>
        <section
          id="guia-estudos"
          className="study-guide"
          aria-labelledby="guide-title"
        >
          <span className="guide-icon">
            <Icon name="sparkles" size={25} />
          </span>
          <div>
            <h2 id="guide-title">Aprender é mais do que chegar ao fim.</h2>
            <p>
              Leia a aula, experimente o desafio e só então marque como
              concluída. Cada pequeno passo importa.
            </p>
          </div>
          <span className="guide-decoration" aria-hidden="true">
            ✦
          </span>
        </section>
        <footer className="page-footer">
          <span>
            trilha<span className="brand-dot">.</span>{" "}
            <span>Feito para quem nunca para de aprender.</span>
          </span>
          <button
            className="reset-button"
            disabled={!completedIds.length}
            onClick={() => setConfirmReset(true)}
          >
            <Icon name="reset" size={14} />
            Reiniciar progresso
          </button>
        </footer>
      </main>
      <Toast notification={notification} onDismiss={dismissNotification} />
      {activeLesson && (
        <LessonDialog
          lesson={activeLesson}
          onClose={() => setActiveLesson(null)}
        />
      )}
      {confirmReset && (
        <Modal
          title="Começar uma nova jornada?"
          className="confirm-modal"
          onClose={() => setConfirmReset(false)}
        >
          <p className="confirm-description">
            Suas {completedIds.length} aulas concluídas serão desmarcadas neste
            navegador. O conteúdo das aulas continuará disponível.
          </p>
          <div className="dialog-footer">
            <button
              className="secondary-button"
              onClick={() => setConfirmReset(false)}
            >
              Manter meu progresso
            </button>
            <button
              className="primary-button"
              onClick={() => {
                resetProgress();
                setConfirmReset(false);
              }}
            >
              Sim, reiniciar
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
