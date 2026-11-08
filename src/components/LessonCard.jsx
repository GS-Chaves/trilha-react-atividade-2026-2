import { useStudy } from "../context/StudyContext.jsx";
import Icon from "./Icon.jsx";

export default function LessonCard({ lesson, onOpen }) {
  const { completedIds, toggleLesson } = useStudy();
  const complete = completedIds.includes(lesson.id);
  const tone = {
    Fundamentos: "purple",
    Interatividade: "orange",
    Aplicação: "green",
  }[lesson.category];
  return (
    <article className={`lesson-card ${complete ? "is-complete" : ""}`}>
      <div className="lesson-card-top">
        <span className={`lesson-icon ${tone}`}>
          <Icon name={lesson.icon} size={24} />
        </span>
        <span className={`category-badge ${tone}`}>{lesson.category}</span>
        <span className="lesson-number">
          {String(lesson.id).padStart(2, "0")}
        </span>
      </div>
      <h3>{lesson.title}</h3>
      <p className="lesson-description">{lesson.description}</p>
      <div className="lesson-meta">
        <span>
          <Icon name="clock" size={15} />
          {lesson.minutes} min de leitura
        </span>
        <button
          className="text-button"
          onClick={() => onOpen(lesson)}
          aria-label={`Abrir aula: ${lesson.title}`}
        >
          Abrir aula <Icon name="arrow" size={16} />
        </button>
      </div>
      <button
        className={`complete-button ${complete ? "is-complete" : ""}`}
        aria-pressed={complete}
        aria-label={`${complete ? "Desmarcar" : "Concluir"} aula: ${lesson.title}`}
        onClick={() => toggleLesson(lesson.id)}
      >
        <span className="check-box">
          {complete && <Icon name="check" size={13} />}
        </span>
        {complete ? "Aula concluída" : "Marcar como concluída"}
      </button>
    </article>
  );
}
