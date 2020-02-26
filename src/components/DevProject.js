import React from "react";
import { convertISOtoDate } from "../functions/convertISOtoDate";

export function DevProject({ project }) {
	return (
		<section>
			<section id='top'>
				<section id='visible-info'>
					<h1>{project.title}</h1>
					<p>{project.description}</p>
				</section>
				<section id='dev-project-info'>
					<ul>
						<li>
							<p>Creado el {convertISOtoDate(project.created_at)}</p>
						</li>
						<li>
							<p>
								{project.number_of_followers}
								{project.number_of_followers === 1 ? " seguidor" : " seguidores"}
							</p>
						</li>
						<li>
							<p>Categoría: {project.category}</p>
						</li>
						<li>
							<p>
								Complejidad:
								{project.complexity === 1
									? " Fácil"
									: project.complexity === 2
									? " Medio"
									: " Difícil"}
							</p>
						</li>
					</ul>
				</section>
			</section>
			<section id='middle'>
				<h2>Descripción detallada</h2>
				<p>{project.details}</p>
			</section>
		</section>
	);
}
