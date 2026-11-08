import { useStudy } from "../context/StudyContext.jsx";
import { lessons } from "../data/lessons.js";
import ProgressBar from "./ProgressBar.jsx";
import Icon from "./Icon.jsx";

export default function ProgressSummary() {
  const { completedIds, progress } = useStudy();
  const remaining = lessons.length - completedIds.length;
  return (
    <section className="progress-card" aria-labelledby="progress-heading">
      <div className="section-topline">
        <span className="eyebrow">CADA PASSO CONTA</span>
        <Icon name="sprout" />
      </div>
      <h2 id="progress-heading">Seu progresso</h2>
      <div className="progress-numbers">
        <strong>{completedIds.length.toString().padStart(2, "0")}</strong>
        <span>
          / {lessons.length} aulas
          <br />
          <small>concluídas</small>
        </span>
        <span className="progress-percent">{progress}%</span>
      </div>
      <ProgressBar
        value={progress}
        label="Progresso da trilha"
        showLabel={false}
      />
      <p>
        {remaining === 0
          ? "Você completou a trilha. Que conquista!"
          : remaining === 12
            ? "Tudo começa com a primeira aula."
            : `Faltam ${remaining} ${remaining === 1 ? "aula" : "aulas"}. Continue no seu ritmo!`}
      </p>
      <div className="progress-footer">
        <Icon name="check" size={16} />
        <span>Seu aprendizado, no seu tempo.</span>
      </div>
    </section>
  );
}
