import React from "react";
import { Link } from "react-router-dom";

export function ProjectList({ projects }) {
	console.log({ projects });
	return (
		<section className='projectList'>
			<ul>
				{projects.map((project, index) => (
					<li key={index}>
						<section className='project-miniature'>
							<div>
								<Link to='/'>
									<button id='profile' title='Ir a mi perfil'>
										<div className='profile-photo'>
											<img src={project.user_avatar_url} alt='' name='profile photo' />
										</div>
									</button>
								</Link>
								<p>{project.category}</p>
							</div>
							<div id='main-content'>
								<Link to='/'>
									<button id='org-name'>{project.user_name}</button>
								</Link>

								<Link to={`/project/${project.project_id}`}>
									<div>
										<div id='project-data'>
											<h2>{project.title}</h2>
											<p id='project-description'>{project.description}</p>
										</div>
									</div>
								</Link>
							</div>
							<div id='project-info'>
								<ul>
									<li>
										<img
											src='https://img.icons8.com/android/24/000000/sun.png'
											alt=''
											id='icon'
										/>
										<p>{project.created_at.split("T")[0]}</p>
									</li>
									<li>
										<img
											src='https://img.icons8.com/material-outlined/24/000000/user--v1.png'
											alt=''
											id='icon'
										/>
										<p>
											{project.number_of_followers}
											{project.number_of_followers === 1 ? " seguidor" : " seguidores"}
										</p>
									</li>
									<li>{project.complexity}</li>
								</ul>
							</div>
						</section>
					</li>
				))}
			</ul>
		</section>
	);
}
