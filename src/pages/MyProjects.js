import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Filters } from "../components/Filters";
import { useAuth } from "../context/authContext";
import { Header } from "../components/Header";
import { MyProjectsOrg } from "../components/MyProjectsOrg";
import { getAvgRatings } from "../http/projectsService";
import { MyProjectsDev } from "../components/MyProjectsDev";
import { Link } from "react-router-dom";
import { Footer } from "../components/Footer";
import {
	getOrgProjects,
	getFollowedProjects,
	getContributedProjects,
	getNumberOfContributions,
} from "../http/projectsService";
import { SimpleRating } from "../components/Rating";

export function MyProjects() {
	const { jwt } = useAuth();

	let isOrgProfile = jwt.role === "org";

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
		getAvgRatings(userId).then((response) => {
			const ratingRounded = Math.round(response.data * 2) / 2;
			setRating(ratingRounded);
		});
		getNumberOfContributions(userId).then((response) => {
			setNumberOfContributions(response.data);
		});
	}, [filtersState, buttonSelected]);

	if (
		orgProjects !== undefined &&
		followedProjects !== undefined &&
		contributedProjects !== undefined &&
		rating !== undefined
	) {
		return (
			<section id='myProjects' className='container'>
				<Header isAccessWindow={false} />
				<main className='body'>
					<Filters filtersState={filtersState} setFiltersState={setFiltersState}/>
					{isOrgProfile ? (
						<section className='projects-container'>
							<div className='centered-container' id='new-project-button'>
								<Link to='/new-project'>
									<button
										id='new-project'
										aria-label='Click para crear un nuevo proyecto.'
									></button>
								</Link>
								<p>Nuevo proyecto</p>
							</div>
							<MyProjectsOrg
								projects={orgProjects}
								buttonSelected={buttonSelected}
								setButtonSelected={setButtonSelected}
							/>
						</section>
					) : (
						<section className='projects-container'>
							<div className='centered-container' id='my-projects-rating'>
								<SimpleRating readOnly={true} value={rating} id='stars' />
								<p>Mi puntuación media</p>
								{rating
									? `${rating} ${
											rating === 1 ? "estrella" : "estrellas"
									  } / ${numberOfContributions} ${
											numberOfContributions === 1 ? "contribución" : "contribuciones"
									  }`
									: "Este usuario aún no ha recibido puntuaciones"}
							</div>
							<MyProjectsDev
								followedProjects={followedProjects}
								contributedProjects={contributedProjects}
								buttonSelected={buttonSelected}
								setButtonSelected={setButtonSelected}
							/>
						</section>
					)}
				</main>
				<Footer />
			</section>
		);
	} else {
		return <p>Internet va lento, espere</p>;
	}
}
