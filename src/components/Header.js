import React from "react";
import { Search } from "./Search";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

export function Header({ isAccessWindow }) {
	const { currentUser, isAuth } = useAuth();

	return (
		<header className='main-header'>
			{!isAccessWindow && <Search />}
			<div>
				<button
					id='logo-home'
					aria-label='Portal de Ideas. Click para ir a inicio.'
					onClick={() => {
						window.location.href = "/";
					}}
				>
					Portal de Ideas
				</button>
			</div>
			{!isAccessWindow && isAuth && (
				<nav role='navigation'>
					<ul className='nav-row'>
						<li>
							<button id='my-projects' title='Ir a mis proyectos'>
								<img
									className='icon'
									src='https://img.icons8.com/ios/50/000000/summary-list.png'
									alt=''
								/>
								<p>Mis Proyectos</p>
							</button>
						</li>
						<li>
							<Link to='/my-profile'>
								<button id='my-profile' title='Ir a mi perfil'>
									<div className='profile-photo '>
										<img src={currentUser.avatarUrl} alt='' name='profile photo' />
									</div>
									<p>Mi perfil</p>
								</button>
							</Link>
						</li>
						<li>
							<button
								id='logout'
								title='Click para cerrar sesión'
								onClick={() => {
									localStorage.removeItem("currentUser");
									window.location.href = "/";
								}}
							>
								<img
									className='icon'
									src='https://img.icons8.com/ios/50/000000/export.png'
									alt=''
								/>
								<p>Cerrar sesión</p>
							</button>
						</li>
					</ul>
				</nav>
			)}
			{!isAccessWindow && !isAuth && (
				<div>
					<Link to='/access'>
						<button renderAs='button'>ACCEDE O REGÍSTRATE</button>
					</Link>
				</div>
			)}
		</header>
	);
}
