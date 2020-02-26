import React from "react";

import { ProjectList } from "./ProjectList";

const ACTIVE_BUTTON = true;
const INACTIVE_BUTTON = false;

export function MyProjectsOrg({ projects, buttonSelected, setButtonSelected }) {
	const projectsFiltered = filterProjects(projects, buttonSelected);

	return (
		<section className='projects-container'>
			<section className='selectors'>
				<button
					id={buttonSelected === ACTIVE_BUTTON ? "is-selected-line" : ""}
					onClick={() => {
						setButtonSelected(ACTIVE_BUTTON);
					}}
				>
					Activos
				</button>
				<button
					id={buttonSelected === INACTIVE_BUTTON ? "is-selected-line" : ""}
					onClick={() => {
						setButtonSelected(INACTIVE_BUTTON);
					}}
				>
					Inactivos
				</button>
			</section>
			{projectsFiltered.length !== 0 ? (
				<ProjectList projects={projectsFiltered} />
			) : (
				<p id='empty-text'>No hay resultados</p>
			)}
		</section>
	);
}

function filterProjects(projects, buttonSelected) {
	const filteredProjects = [];
	projects.map((project) => {
		if (buttonSelected === ACTIVE_BUTTON) {
			if (project.closed_at === null) {
				filteredProjects.push(project);
			}
		} else {
			if (project.closed_at !== null) {
				filteredProjects.push(project);
			}
		}
	});
	return filteredProjects;
}
