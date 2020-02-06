import React from "react";
import { Search } from "./Search";

export function Header() {
	return (
		<header>
			<Search />
			<div>
				<a
					href='google.es'
					id='logo-home'
					aria-label='Portal de Ideas. Click para ir a inicio.'
				>
					Portal de Ideas
				</a>
			</div>
			<nav role='navigation'>
				<ul>
					<li>
						<a href='user' id='my-projects' title='Ir a mis proyectos'>
							<img
								src='https://img.icons8.com/ios/50/000000/summary-list.png'
								alt=''
							/>
							Mis Proyectos
						</a>
					</li>
					<li>
						<a href='#tags' id='my-profile' title='Ir a mi perfil'>
							<div class='profile-photo'>
								<img
									src='https://res.cloudinary.com/dryaup5lw/image/upload/v1580902958/26e0a06c-1a2f-4590-84b8-387432fad7e4.jpg'
									alt=''
									name='profile photo'
								/>
							</div>
							Mi perfil
						</a>
					</li>
				</ul>
			</nav>
		</header>
	);
}
