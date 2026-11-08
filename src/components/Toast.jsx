import { useEffect, useRef } from "react";

export default function Toast({ notification, onDismiss }) {
  const dismissRef = useRef(onDismiss);
  dismissRef.current = onDismiss;

  useEffect(() => {
    if (!notification) return undefined;
    // O cleanup impede que o temporizador de um toast anterior feche o próximo.
    const timeoutId = window.setTimeout(
      () => dismissRef.current(notification.id),
      4500,
    );
    return () => window.clearTimeout(timeoutId);
  }, [notification?.id]);

  return (
    <div
      className="toast-region"
      aria-live={notification?.type === "error" ? "assertive" : "polite"}
      aria-atomic="true"
    >
      {notification && (
        <div
          className={`toast toast--${notification.type ?? "info"}`}
          key={notification.id}
        >
          <span className="toast-icon" aria-hidden="true">
            {notification.type === "success" ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />
                <path
                  d="m8 12 3 3 5-6"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />
                <path
                  d="M12 8v5m0 3v.01"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </span>
          <p className="toast-message">{notification.message}</p>
          <button
            className="toast-close"
            type="button"
            aria-label="Fechar notificação"
            onClick={() => onDismiss(notification.id)}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="m6 6 12 12M18 6 6 18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
