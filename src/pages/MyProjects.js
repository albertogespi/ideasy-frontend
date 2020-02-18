import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Filters } from "../components/Filters";
import { useAuth } from "../context/authContext";
import { Header } from "../components/Header";
import { MyProjectsOrg } from "../components/MyProjectsOrg";
import { MyProjectsDev } from "../components/MyProjectsDev";
import {
	getOrgProjects,
	getFollowedProjects,
	getContributedProjects,
} from "../http/projectsService";

export function MyProjects() {
	const { jwt } = useAuth();

	let isOrgProfile = jwt.role === "org";

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
		orgProjects !== undefined &&
		followedProjects !== undefined &&
		contributedProjects !== undefined
	) {
		console.log(orgProjects);

		return (
			<section className='container'>
				<Header isAccessWindow={false} />
				<main className='home'>
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
							userWindow={false}
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
				</main>
			</section>
		);
	} else {
		return <p>Internet va lento, espere</p>;
	}
}
