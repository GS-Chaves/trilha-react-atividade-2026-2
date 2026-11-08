import { useState } from "react";
import { lessons } from "../data/lessons.js";
import { useStudy } from "../context/StudyContext.jsx";
import Dropdown from "./Dropdown.jsx";
import Pagination from "./Pagination.jsx";
import LessonCard from "./LessonCard.jsx";
import Icon from "./Icon.jsx";

const PAGE_SIZE = 6;
const categories = [
  "Todas as categorias",
  "Fundamentos",
  "Interatividade",
  "Aplicação",
].map((label, index) => ({ value: index === 0 ? "all" : label, label }));
const normalize = (text) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR");

export default function LessonCatalog({ completedOnly = false, onOpen }) {
  const { completedIds } = useStudy();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);
  const filtered = lessons.filter(
    (lesson) =>
      (!completedOnly || completedIds.includes(lesson.id)) &&
      (category === "all" || lesson.category === category) &&
      normalize(`${lesson.title} ${lesson.description}`).includes(
        normalize(query.trim()),
      ),
  );
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  // Se a última aula da página for desmarcada, nunca exibir uma página vazia inválida.
  const currentPage = Math.min(page, Math.max(1, totalPages));
  const start = (currentPage - 1) * PAGE_SIZE;
  function clearFilters() {
    setQuery("");
    setCategory("all");
    setPage(1);
  }

  return (
    <div className="lesson-catalog">
      <div className="catalog-toolbar">
        <label className="search-field">
          <Icon name="search" size={19} />
          <span className="sr-only">Buscar aulas</span>
          <input
            type="search"
            placeholder="O que você quer aprender?"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(1);
            }}
          />
        </label>
        <Dropdown
          label="Filtrar por categoria"
          options={categories}
          value={category}
          onChange={(value) => {
            setCategory(value);
            setPage(1);
          }}
        />
      </div>
      <div className="catalog-caption" role="status">
        <span>
          {filtered.length}{" "}
          {filtered.length === 1 ? "aula encontrada" : "aulas encontradas"}
          {completedOnly
            ? " entre suas conquistas"
            : " para dar o próximo passo"}
        </span>
        <span>LEIA. PRATIQUE. EVOLUA.</span>
      </div>
      {filtered.length ? (
        <>
          <div className="lesson-grid">
            {filtered.slice(start, start + PAGE_SIZE).map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} onOpen={onOpen} />
            ))}
          </div>
          <div className="catalog-bottom">
            <p>
              Mostrando{" "}
              <strong>
                {start + 1}–{Math.min(start + PAGE_SIZE, filtered.length)}
              </strong>{" "}
              de {filtered.length} aulas
            </p>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        </>
      ) : (
        <div className="empty-state">
          <span className="lesson-icon purple">
            <Icon
              name={
                completedOnly && !query && category === "all"
                  ? "sprout"
                  : "search"
              }
              size={28}
            />
          </span>
          <h3>
            {completedOnly && !query && category === "all"
              ? "Suas conquistas vão aparecer aqui"
              : "Nenhuma aula por aqui"}
          </h3>
          <p>
            {completedOnly && !query && category === "all"
              ? "Abra uma aula na aba Todas as aulas e marque como concluída."
              : "Experimente outro termo ou uma categoria diferente."}
          </p>
          {(query || category !== "all") && (
            <button className="secondary-button" onClick={clearFilters}>
              Limpar filtros
            </button>
          )}
        </div>
      )}
    </div>
  );
}
