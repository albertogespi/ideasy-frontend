import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Filters } from "../components/Filters";
import { Header } from "../components/Header";
import { getAvgRatings } from "../http/projectsService";
import { SimpleRating } from "../components/Rating";
import { getUser } from "../http/userService";
import { MyProjectsOrg } from "../components/MyProjectsOrg";
import { MyProjectsDev } from "../components/MyProjectsDev";
import {
	getOrgProjects,
	getFollowedProjects,
	getContributedProjects,
	getNumberOfContributions,
} from "../http/projectsService";
import { Footer } from "../components/Footer";

export function User() {
	const categories = [
		"Todas",
		"Blog",
		"Corporativa",
		"e-Commerce",
		"e-Learning",
		"Noticias",
		"Wikis",
	];

	const complexities = ["Todas", "Fácil", "Medio", "Difícil"];

	const userId = window.location.href.split("/")[4];
	const [user, setUser] = useState(undefined);
	const [isOrgProfile, setIsOrgProfile] = useState(undefined);

	//IsOrgProfile = true
	const [orgProjects, setOrgProjects] = useState([]);

	//IsOrgProfile = false
	const [followedProjects, setFollowedProjects] = useState([]);
	const [contributedProjects, setContributedProjects] = useState([]);
	const [rating, setRating] = useState(undefined);
	const [numberOfContributions, setNumberOfContributions] = useState(0);

	const [buttonSelected, setButtonSelected] = useState(true);

	//filters
	const [filtersState, setFiltersState] = useState({
		category: '',
		complexity: '',
	  });

	const history = useHistory();

	let historyQuery = "";
	const updateQuery = () => {
		console.log(filtersState);
		  if (filtersState.category !== '') {
			historyQuery += `/?category=${filtersState.category}`;
		  }
	  
		  if (filtersState.complexity !== '') {
			if (historyQuery === "") {
			  historyQuery += `/?complexity=${filtersState.complexity}`;
			} else {
			  historyQuery += `&complexity=${filtersState.complexity}`;
			}
		  }
	  
		  history.push(`/user/${userId}` + historyQuery);
		};

	useEffect(() => {
		getUser(userId).then((response) => {
			setUser(response.data);
			setIsOrgProfile(response.data.role === "org");
		});
		getAvgRatings(userId).then((response) => {
			const ratingRounded = Math.round(response.data * 2) / 2;
			setRating(ratingRounded);
		});
		getNumberOfContributions(userId).then((response) => {
			setNumberOfContributions(response.data);
		});
		updateQuery();
		if (isOrgProfile) {
			getOrgProjects(userId, historyQuery).then((response) => {
				setOrgProjects(response.data);
			});
		} else {
			getFollowedProjects(userId, historyQuery).then((response) =>
				setFollowedProjects(response.data),
			);
			getContributedProjects(userId, historyQuery).then((response) =>
				setContributedProjects(response.data),
			);
		}
	}, [isOrgProfile, filtersState, buttonSelected]);

	if (
		user !== undefined &&
		rating !== undefined &&
		orgProjects !== undefined &&
		followedProjects !== undefined &&
		contributedProjects !== undefined &&
		numberOfContributions !== undefined
	) {
		console.log(userId);
		return (
			<section className='container'>
				<Header isAccessWindow={false} />
				<section className='body'>
					<div className='header-user'>
						<section className='centered-container' id='user-container'>
							<p id='profile-role'>
								{user.role === "dev" ? "Perfil Desarrollador" : "Perfil Organización"}
							</p>
							<div className='profile-photo' id='big-icon'>
								<img
									src={user.avatarUrl || require("../images/default-avatar.jpg")}
									alt=''
									name='profile photo'
								></img>
							</div>
							<h1>{user.name}</h1>

							<div className='centered-container' id='rating'>
								{user.role === "dev" && (
									<div className='centered-container'>
										<SimpleRating readOnly={true} value={rating} id='stars' />
										<p>Puntuación media</p>
										{rating
											? `${rating} ${
													rating === 1 ? "estrella" : "estrellas"
											  } / ${numberOfContributions} ${
													numberOfContributions === 1 ? "contribución" : "contribuciones"
											  }`
											: "Este usuario aún no ha recibido puntuaciones"}
									</div>
								)}
							</div>
							<div className='centered-container' id='contact'>
								<h2>Contacto</h2>
								<p>{user.contactEmail || user.email}</p>
								{user.contactWeb !== "NULL" && <a href={user.contactWeb}>Enlace web</a>}
							</div>
						</section>
					</div>
					<section className='projects'>
					<Filters filtersState={filtersState} setFiltersState={setFiltersState}/>
						{isOrgProfile ? (
							<MyProjectsOrg
								projects={orgProjects}
								buttonSelected={buttonSelected}
								setButtonSelected={setButtonSelected}
							/>
						) : (
							<MyProjectsDev
								followedProjects={followedProjects}
								contributedProjects={contributedProjects}
								buttonSelected={buttonSelected}
								setButtonSelected={setButtonSelected}
							/>
						)}
					</section>
				</section>
				<Footer />
			</section>
		);
	} else {
		return <p>Cargando datos de usuario...</p>;
	}
}
