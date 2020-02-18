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
} from "../http/projectsService";

export function User() {
	const categories = [
		"Todas",
		"Blog",
		"e-Commerce",
		"e-Learning",
		"Corporativa",
		"Noticias",
		"Wikis",
	];

	const complexities = ["Todas", "Fácil", "Medio", "Difícil"];

	const userId = window.location.href.split("/")[4];
	const [user, setUser] = useState(undefined);
	const [isOrgProfile, setIsOrgProfile] = useState(undefined);

	const [rating, setRating] = useState(undefined);

	//IsOrgProfile = true
	const [orgProjects, setOrgProjects] = useState([]);

	//IsOrgProfile = false
	const [followedProjects, setFollowedProjects] = useState([]);
	const [contributedProjects, setContributedProjects] = useState([]);

	const [buttonSelected, setButtonSelected] = useState(true);

	//filters
	const [selectedCategory, setSelectedCategory] = useState(0);
	const [selectedComplexity, setSelectedComplexity] = useState(0);

	const history = useHistory();

	let historyQuery = "";
	const updateQuery = () => {
		if (selectedCategory !== 0) {
			historyQuery += `/?category=${categories[selectedCategory]}`;
		}

		if (selectedComplexity !== 0) {
			if (historyQuery === "") {
				historyQuery += `/?complexity=${selectedComplexity}`;
			} else {
				historyQuery += `&complexity=${selectedComplexity}`;
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
			setRating(response.data);
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
	}, [isOrgProfile, selectedComplexity, selectedCategory, buttonSelected]);

	if (
		user !== undefined &&
		rating !== undefined &&
		orgProjects !== undefined &&
		followedProjects !== undefined &&
		contributedProjects !== undefined
	) {
		return (
			<section className='container'>
				<Header isAccessWindow={false} />
				<div className='centered-container'>
					<section className='centered-container' id='user-container'>
						<div className='profile-photo'>
							<img src={user.avatarUrl} alt='' name='profile photo'></img>
						</div>
						<h1>{user.name}</h1>
						<p>{user.role === "dev" ? "Desarrollador" : "Organización"}</p>
						<div className='centered-container' id='rating'>
							{user.role === "dev" && (
								<div className='centered-container'>
									<SimpleRating readOnly={true} id='stars' />
									<p>Puntuación media</p>
									{rating
										? `${rating} estrellas`
										: "Este usuario aún no ha recibido puntuaciones."}
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
				<section>
					<section className='home'>
						<Filters
							categories={categories}
							complexities={complexities}
							selectedCategory={selectedCategory}
							setSelectedCategory={setSelectedCategory}
							selectedComplexity={selectedComplexity}
							setSelectedComplexity={setSelectedComplexity}
						/>
						{isOrgProfile ? (
							<MyProjectsOrg
								userWindow={true}
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
			</section>
		);
	} else {
		return <p>Cargando datos de usuario...</p>;
	}
}
