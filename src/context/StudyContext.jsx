import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { lessons } from "../data/lessons.js";

const StudyContext = createContext(null);
const STORAGE_KEY = "trilha:completed:v1";

function readProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    if (!Array.isArray(saved)) return [];
    return [...new Set(saved)].filter((id) =>
      lessons.some((lesson) => lesson.id === id),
    );
  } catch {
    return [];
  }
}

export function StudyProvider({ children }) {
  const [completedIds, setCompletedIds] = useState(readProgress);
  const [notification, setNotification] = useState(null);
  const [storageAvailable, setStorageAvailable] = useState(true);

  const notify = useCallback((message, type = "success") => {
    setNotification({ id: crypto.randomUUID(), message, type });
  }, []);

  const dismissNotification = useCallback((id) => {
    setNotification((current) => (current?.id === id ? null : current));
  }, []);

  // O efeito mantém o progresso após recarregar. Sem armazenamento, a sessão continua utilizável.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completedIds));
      setStorageAvailable(true);
    } catch {
      setStorageAvailable(false);
      notify(
        "Não foi possível salvar neste navegador. Seu progresso vale apenas nesta sessão.",
        "error",
      );
    }
  }, [completedIds, notify]);

  function toggleLesson(id) {
    const wasCompleted = completedIds.includes(id);
    setCompletedIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
    notify(
      wasCompleted
        ? "Aula marcada para estudar novamente."
        : "Aula concluída. Mais um passo na sua trilha!",
      wasCompleted ? "info" : "success",
    );
  }

  function resetProgress() {
    setCompletedIds([]);
    notify("Progresso reiniciado. Uma nova jornada começa agora!", "info");
  }

  return (
    <StudyContext.Provider
      value={{
        completedIds,
        progress: Math.round((completedIds.length / lessons.length) * 100),
        toggleLesson,
        resetProgress,
        notification,
        notify,
        dismissNotification,
        storageAvailable,
      }}
    >
      {children}
    </StudyContext.Provider>
  );
}

export function useStudy() {
  const context = useContext(StudyContext);
  if (!context) throw new Error("useStudy deve estar dentro de StudyProvider.");
  return context;
}
