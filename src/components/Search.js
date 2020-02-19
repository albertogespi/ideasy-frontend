import React, { useRef } from "react";
import { callbackify } from "util";

export function Search({ onSearch }) {
  const inputRef = useRef(null);

  return (
    <div role="search">
      <input
        ref={inputRef}
        type="search"
        className="search"
        aria-label="Escribe aquí para buscar"
      />
      <button
        className="form"
        id="search"
        onClick={() => onSearch(inputRef.current.value)}
      >
        Buscar
      </button>
    </div>
  );
}
