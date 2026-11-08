export default function ProgressBar({
  value,
  label = "Progresso",
  showLabel = true,
}) {
  const progress = Number.isFinite(value)
    ? Math.min(100, Math.max(0, value))
    : 0;
  const percentage = Math.round(progress);

  return (
    <div className="progress">
      {showLabel && (
        <div className="progress-label">
          <span>{label}</span>
          <strong>{percentage}%</strong>
        </div>
      )}
      <div
        className="progress-track"
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percentage}
        aria-valuetext={`${percentage}% concluído`}
      >
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
