import React from "react";

export function Search({ searchText, onAddNote, onSearchTextChanged }) {
  return (
    <div role="search">
      <input
        type="search"
        value={searchText}
        className="search"
        onChange={e => onSearchTextChanged(e.target.value)}
        aria-label="Escribe aquí para buscar"
      />
      <button className="form" id="search" onClick={onAddNote}>
        Buscar
      </button>
    </div>
  );
}
