import React from "react";

export function ProjectList({ projects }) {
	console.log({ projects });
	return (
		<section className='projectList'>
			<ul>
				{projects.map((project, index) => (
					<li>
						<section className='project-miniature'>
							<div>
								<a href='google.es' id='my-profile' title='Ir a mi perfil'>
									<div class='profile-photo'>
										<img src={project.user_avatar_url} alt='' name='profile photo' />
									</div>
								</a>
								<p>{project.category}</p>
							</div>
							<div id='main-content'>
								<a href='google.es' id='org-name'>
									{project.user_name}
								</a>
								<a href='google.es'>
									<div>
										<h2>{project.title}</h2>
										<p id='project-description'>{project.description}</p>
									</div>
								</a>
							</div>
							<div id='project-info'>
								<ul>
									<li>
										<img
											src='https://img.icons8.com/android/24/000000/sun.png'
											alt=''
											id='icon'
										/>
										<p>{project.created_at}</p>
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
