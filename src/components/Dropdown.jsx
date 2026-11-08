import { useEffect, useId, useRef, useState } from "react";

export default function Dropdown({ label, value, options, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const optionRefs = useRef([]);
  const instanceId = useId();
  const selectedIndex = options.findIndex((option) => option.value === value);
  const selected = options[selectedIndex];

  useEffect(() => {
    if (!isOpen) return undefined;
    function closeOutside(event) {
      if (!rootRef.current?.contains(event.target)) setIsOpen(false);
    }
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) optionRefs.current[focusedIndex]?.focus();
  }, [isOpen, focusedIndex]);

  function openMenu(index = Math.max(0, selectedIndex)) {
    if (options.length === 0) return;
    setFocusedIndex(index);
    setIsOpen(true);
  }

  function closeMenu() {
    setIsOpen(false);
    triggerRef.current?.focus();
  }

  function selectOption(option) {
    onChange(option.value);
    closeMenu();
  }

  function handleOptionKeyDown(event, index) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu();
      return;
    }
    let nextIndex;
    if (event.key === "ArrowDown") nextIndex = (index + 1) % options.length;
    else if (event.key === "ArrowUp")
      nextIndex = (index - 1 + options.length) % options.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = options.length - 1;
    else return;
    event.preventDefault();
    setFocusedIndex(nextIndex);
  }

  return (
    <div
      className="dropdown"
      ref={rootRef}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setIsOpen(false);
      }}
    >
      {label && (
        <span className="dropdown-label" id={`${instanceId}-label`}>
          {label}
        </span>
      )}
      <button
        className={`dropdown-trigger${isOpen ? " is-open" : ""}`}
        ref={triggerRef}
        type="button"
        aria-label={`${label ? `${label}: ` : ""}${selected?.label ?? "Selecione"}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={`${instanceId}-options`}
        disabled={options.length === 0}
        onClick={() => (isOpen ? closeMenu() : openMenu())}
        onKeyDown={(event) => {
          if (event.key === "Escape" && isOpen) {
            event.preventDefault();
            closeMenu();
          }
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            openMenu(
              event.key === "ArrowUp"
                ? options.length - 1
                : Math.max(0, selectedIndex),
            );
          }
        }}
      >
        <span>{selected?.label ?? "Selecione"}</span>
        <svg
          width="16"
          height="16"
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
      {isOpen && (
        <div
          className="dropdown-menu"
          id={`${instanceId}-options`}
          role="listbox"
          aria-label={label ?? "Opções"}
        >
          {options.map((option, index) => (
            <button
              className={`dropdown-option${option.value === value ? " is-selected" : ""}`}
              key={option.value}
              ref={(element) => {
                optionRefs.current[index] = element;
              }}
              type="button"
              role="option"
              aria-selected={option.value === value}
              tabIndex={focusedIndex === index ? 0 : -1}
              onFocus={() => setFocusedIndex(index)}
              onClick={() => selectOption(option)}
              onKeyDown={(event) => handleOptionKeyDown(event, index)}
            >
              <span>{option.label}</span>
              {option.value === value && (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="m5 12 4 4L19 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
