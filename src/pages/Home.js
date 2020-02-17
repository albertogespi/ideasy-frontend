import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { Header } from "../components/Header";
import { Filters } from "../components/Filters";
import { ProjectList } from "../components/ProjectList";

import { getHomeProjects } from "../http/homeService";

export function Home() {
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

	const [projects, setProjects] = useState([]);
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

		history.push(historyQuery);
	};

	useEffect(() => {
		updateQuery();
		getHomeProjects(historyQuery).then((response) => setProjects(response.data));
	}, [selectedCategory, selectedComplexity]);

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
				<ProjectList projects={projects} />
			</main>
		</section>
	);
}
