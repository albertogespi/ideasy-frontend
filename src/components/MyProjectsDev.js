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
		<section>
			<section>
				<button
					onClick={() => {
						setButtonSelected(FOLLOWED_BUTTON);
					}}
				>
					Seguidos
				</button>
				<button
					onClick={() => {
						setButtonSelected(CONTRIBUTED_BUTTON);
					}}
				>
					Aportados
				</button>
			</section>
			<ProjectList
				projects={buttonSelected ? followedProjects : contributedProjects}
			/>
		</section>
	);
}
