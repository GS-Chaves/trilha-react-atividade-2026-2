import { useId, useState } from "react";

export default function Accordion({ items }) {
  const [openId, setOpenId] = useState(null);
  const instanceId = useId();

  return (
    <div className="accordion">
      {items.map((item, index) => {
        const isOpen = openId === item.id;
        const triggerId = `${instanceId}-trigger-${index}`;
        const panelId = `${instanceId}-panel-${index}`;

        return (
          <section
            className={`accordion-item${isOpen ? " is-open" : ""}`}
            key={item.id}
          >
            <h3 className="accordion-heading">
              <button
                className="accordion-trigger"
                id={triggerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
              >
                <span>{item.title}</span>
                <svg
                  className="accordion-chevron"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="m6 9 6 6 6-6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </h3>
            <div
              className={`accordion-panel${isOpen ? " is-open" : ""}`}
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              aria-hidden={!isOpen}
              inert={!isOpen}
            >
              <div className="accordion-panel-inner">
                <div className="accordion-content">{item.content}</div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
