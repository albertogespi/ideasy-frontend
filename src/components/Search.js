import React, { useRef } from "react";
import { callbackify } from "util";
import { getSearchResults } from "../http/searchService";

export function Search({ onSearch }) {
	const inputRef = useRef(null);
	const currentUrl = window.location.href;
	console.log(currentUrl);

	return (
		<div role='search'>
			<input
				ref={inputRef}
				type='search'
				className='search'
				aria-label='Escribe aquí para buscar'
			/>
			<button
				className='form'
				id='search'
				onClick={() => {
					if (inputRef.current.value !== "") {
						const searchQuery = `?search=${inputRef.current.value}`;
						getResults(searchQuery, onSearch);
					} else {
						onSearch(undefined);
					}
				}}
			>
				Buscar
			</button>
		</div>
	);
}

function getResults(searchQuery, onCompleted) {
	console.log(searchQuery);
	return getSearchResults(searchQuery).then((response) =>
		onCompleted(response.data),
	);
}
