import { useId, useRef, useState } from "react";

export default function Tabs({ items, defaultTab }) {
  const [activeId, setActiveId] = useState(defaultTab ?? items[0]?.id);
  const instanceId = useId();
  const tabRefs = useRef([]);
  const selectedId = items.some((item) => item.id === activeId)
    ? activeId
    : items[0]?.id;

  function handleKeyDown(event, index) {
    let nextIndex;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % items.length;
    else if (event.key === "ArrowLeft")
      nextIndex = (index - 1 + items.length) % items.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = items.length - 1;
    else return;

    // As setas movimentam o foco e ativam a aba, sem exigir o mouse.
    event.preventDefault();
    setActiveId(items[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <div className="tabs">
      <div className="tab-list" role="tablist" aria-label="Conteúdo da trilha">
        {items.map((item, index) => (
          <button
            key={item.id}
            ref={(element) => {
              tabRefs.current[index] = element;
            }}
            className={`tab${item.id === selectedId ? " is-active" : ""}`}
            id={`${instanceId}-tab-${index}`}
            type="button"
            role="tab"
            aria-selected={item.id === selectedId}
            aria-controls={`${instanceId}-panel-${index}`}
            tabIndex={item.id === selectedId ? 0 : -1}
            onClick={() => setActiveId(item.id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
          >
            {item.label}
          </button>
        ))}
      </div>
      {items.map((item, index) => (
        <div
          className="tab-panel"
          id={`${instanceId}-panel-${index}`}
          key={item.id}
          role="tabpanel"
          aria-labelledby={`${instanceId}-tab-${index}`}
          hidden={item.id !== selectedId}
          tabIndex={0}
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}
