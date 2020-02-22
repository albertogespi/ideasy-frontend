import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";

import { Header } from "../components/Header";
import { Filters } from "../components/Filters";
import { ProjectList } from "../components/ProjectList";

import { getHomeProjects } from "../http/homeService";
import { Footer } from "../components/Footer";

const MOST_RECENT_BUTTON = true;
const MOST_FOLLOWED_BUTTON = false;

export function Home() {
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

	const [projects, setProjects] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState(0);
	const [selectedComplexity, setSelectedComplexity] = useState(0);

	const [buttonSelected, setButtonSelected] = useState(MOST_RECENT_BUTTON);

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

		history.push(historyQuery);
	};

	useEffect(() => {
		updateQuery();
		getHomeProjects(historyQuery).then((response) => setProjects(response.data));
	}, [selectedCategory, selectedComplexity, buttonSelected]);

	if (projects !== undefined) {
		return (
			<section className='container'>
				<Header isAccessWindow={false} />
				<section id='home-body'>
					<section className='home-image'>
						<p className='first'>Únete ya a Ideasy, el portal de ideas de software</p>
						<p className='second'>
							Regístrate como desarrollador u organización, participa en proyectos de
							software innovadores o publica las necesidades tecnológicas de tu
							organización.
						</p>
					</section>
					<main className='projects'>
						<Filters
							categories={categories}
							complexities={complexities}
							selectedCategory={selectedCategory}
							setSelectedCategory={setSelectedCategory}
							selectedComplexity={selectedComplexity}
							setSelectedComplexity={setSelectedComplexity}
						/>
						<section className='projects-container'>
							<section className='selectors'>
								<button
									id={buttonSelected === MOST_RECENT_BUTTON ? "is-selected-line" : ""}
									onClick={() => {
										setButtonSelected(MOST_RECENT_BUTTON);
									}}
								>
									Más recientes
								</button>
								<button
									id={buttonSelected === MOST_FOLLOWED_BUTTON ? "is-selected-line" : ""}
									onClick={() => {
										setButtonSelected(MOST_FOLLOWED_BUTTON);
									}}
								>
									Más populares
								</button>
							</section>
							<ProjectList
								projects={
									buttonSelected === MOST_RECENT_BUTTON
										? projects
										: sortByMostPopular(projects)
								}
							/>
						</section>
					</main>
				</section>
				<Footer />
			</section>
		);
	} else {
		return <p>Internet va lento, espere</p>;
	}
}

function sortByMostPopular(projects) {
	return projects.sort((a, b) =>
		a.number_of_followers > b.number_of_followers ? -1 : 1,
	);
}
