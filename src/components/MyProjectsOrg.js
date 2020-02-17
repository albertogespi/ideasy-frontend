import React from "react";

import { ProjectList } from "./ProjectList";

export function MyProjectsOrg({ projects }) {
	return (
		<section>
			<ProjectList projects={projects} />
		</section>
	);
}
