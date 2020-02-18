import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Filters } from "../components/Filters";
import { useAuth } from "../context/authContext";
import { Header } from "../components/Header";
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

		history.push(`/my-projects/${userId}` + historyQuery);
	};

	useEffect(() => {
		getUser(userId).then((response) => {
			setUser(response.data);
			setIsOrgProfile(response.data.role === "org");
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
	}, [selectedComplexity, selectedCategory, buttonSelected]);

	if (
		user !== undefined &&
		orgProjects !== undefined &&
		followedProjects !== undefined &&
		contributedProjects !== undefined
	) {
		console.log(user);
		return (
			<main>
				<Header isAccessWindow={false} />
				<section className='centered-container'>
					<div className='profile-photo'>
						<img src={user.avatarUrl} alt='' name='profile photo'></img>
					</div>
					<p>{user.role === "dev" ? "Desarrollador" : "Organización"}</p>
					<h1 className='profile-name'>{user.name}</h1>
					<div>
						<h2>Contacto</h2>
						<p>Email: {user.contactEmail || user.email}</p>
						{user.contactWeb && <p>Web: {user.contactWeb}</p>}
					</div>
				</section>
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
			</main>
		);
	} else {
		return <p>Cargando datos de usuario...</p>;
	}
}
