import React from "react";

export function Search({ searchText, onAddNote, onSearchTextChanged }) {
	return (
		<div role='search'>
			<input
				type='search'
				value={searchText}
				onChange={(e) => onSearchTextChanged(e.target.value)}
				aria-label='Escribe aquí para buscar'
			/>
			<button onClick={onAddNote}>Buscar</button>
		</div>
	);
}
