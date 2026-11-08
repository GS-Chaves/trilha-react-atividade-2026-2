import { useStudy } from "../context/StudyContext.jsx";
import Modal from "./Modal.jsx";
import Icon from "./Icon.jsx";

export default function LessonDialog({ lesson, onClose }) {
  const { completedIds, toggleLesson } = useStudy();
  const complete = completedIds.includes(lesson.id);
  return (
    <Modal title={lesson.title} onClose={onClose}>
      <div className="dialog-meta">
        <span>{lesson.category}</span>
        <span>
          <Icon name="clock" size={16} />
          {lesson.minutes} min de leitura
        </span>
      </div>
      <div className="lesson-body">
        {lesson.content.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
        <h3>Veja na prática</h3>
        <pre>
          <code>{lesson.example}</code>
        </pre>
        <div className="challenge">
          <Icon name="sparkles" />
          <div>
            <h3>Agora é sua vez</h3>
            <p>{lesson.challenge}</p>
          </div>
        </div>
      </div>
      <div className="dialog-footer">
        <button className="secondary-button" onClick={onClose}>
          Voltar para a trilha
        </button>
        <button
          className="primary-button"
          onClick={() => {
            toggleLesson(lesson.id);
            onClose();
          }}
        >
          <Icon name={complete ? "reset" : "check"} size={18} />
          {complete ? "Estudar novamente" : "Concluir aula"}
        </button>
      </div>
    </Modal>
  );
}
