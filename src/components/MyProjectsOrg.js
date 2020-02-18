import React from "react";

import { ProjectList } from "./ProjectList";
import { Link } from "react-router-dom";

const ACTIVE_BUTTON = true;
const INACTIVE_BUTTON = false;

export function MyProjectsOrg({
	userWindow,
	projects,
	buttonSelected,
	setButtonSelected,
}) {
	return (
		<section>
			<section>
				<section>
					<button
						id={buttonSelected === ACTIVE_BUTTON ? "is-selected" : ""}
						onClick={() => {
							setButtonSelected(ACTIVE_BUTTON);
						}}
					>
						Activos
					</button>
					<button
						id={buttonSelected === INACTIVE_BUTTON ? "is-selected" : ""}
						onClick={() => {
							setButtonSelected(INACTIVE_BUTTON);
						}}
					>
						Inactivos
					</button>
				</section>
				{!userWindow && (
					<Link to='/new-project'>
						<button id='new-project' aria-label='Click para crear un nuevo proyecto.'>
							Nuevo Proyecto
						</button>
					</Link>
				)}
			</section>
			<ProjectList projects={filterProjects(projects, buttonSelected)} />
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
