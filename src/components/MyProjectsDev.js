import React from "react";

import { ProjectList } from "./ProjectList";

const FOLLOWED_BUTTON = true;
const CONTRIBUTED_BUTTON = false;

export function MyProjectsDev({
	followedProjects,
	contributedProjects,
	buttonSelected,
	setButtonSelected,
}) {
	return (
		<section class='projects-container'>
			<section className='selectors'>
				<button
					id={buttonSelected === FOLLOWED_BUTTON ? "is-selected-line" : ""}
					onClick={() => {
						setButtonSelected(FOLLOWED_BUTTON);
					}}
				>
					Seguidos
				</button>
				<button
					id={buttonSelected === CONTRIBUTED_BUTTON ? "is-selected-line" : ""}
					onClick={() => {
						setButtonSelected(CONTRIBUTED_BUTTON);
					}}
				>
					Aportados
				</button>
			</section>
			{buttonSelected === FOLLOWED_BUTTON ? (
				followedProjects.length !== 0 ? (
					<ProjectList projects={followedProjects} />
				) : (
					<p id='empty-text'>No hay resultados</p>
				)
			) : contributedProjects.length !== 0 ? (
				<ProjectList projects={contributedProjects} />
			) : (
				<p id='empty-text'>No hay resultados</p>
			)}
		</section>
	);
}
