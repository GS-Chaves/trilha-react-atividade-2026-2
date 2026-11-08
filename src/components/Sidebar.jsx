import { useStudy } from "../context/StudyContext.jsx";
import Icon from "./Icon.jsx";

export default function Sidebar() {
  const { completedIds, storageAvailable } = useStudy();
  return (
    <aside className="sidebar">
      <a className="brand" href="#inicio" aria-label="Trilha, início">
        <span className="brand-mark">
          <Icon name="layers" size={27} />
        </span>
        trilha<span className="brand-dot">.</span>
      </a>
      <p className="sidebar-label">SEU ESPAÇO DE ESTUDOS</p>
      <nav className="side-nav" aria-label="Navegação principal">
        <a href="#inicio">
          <Icon name="home" />
          Visão geral
        </a>
        <a className="nav-highlight" href="#minha-trilha">
          <Icon name="book" />
          Minha trilha<span className="nav-count">12</span>
        </a>
        <a href="#guia-estudos">
          <Icon name="sparkles" />
          Guia de estudos
        </a>
      </nav>
      <div className="sidebar-note">
        <span className="sprout-icon">
          <Icon name="sprout" size={25} />
        </span>
        <strong>Um pouco a cada dia.</strong>
        <p>Grandes ideias começam com pequenos passos.</p>
        <span>
          {completedIds.length} de 12 passos dados{" "}
          <Icon name="arrow" size={16} />
        </span>
      </div>
      <div className="sidebar-profile">
        <span className="avatar">E</span>
        <div>
          <strong>Meu aprendizado</strong>
          <small>
            <span className="status-dot" />
            {storageAvailable
              ? "Salvo neste navegador"
              : "Somente nesta sessão"}
          </small>
        </div>
      </div>
    </aside>
  );
}
