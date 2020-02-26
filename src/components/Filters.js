import React from "react";

export function Filters({
	categories,
	complexities,
	selectedCategory,
	setSelectedCategory,
	selectedComplexity,
	setSelectedComplexity,
	updateQuery,
}) {
	return (
		<section className='filters'>
			<nav>
				<section id='category'>
					<p>Filtrar por categoría</p>
					<ul>
						{categories.map((cat, index) => (
							<li key={index}>
								<button
									id={selectedCategory === index ? "is-selected-bg" : ""}
									onClick={() => {
										setSelectedCategory(index);
									}}
								>
									{cat}
								</button>
							</li>
						))}
					</ul>
				</section>
				<section id='complexity'>
					<p>Filtrar por complejidad</p>
					<ul>
						{complexities.map((comp, index) => (
							<li key={index}>
								<button
									id={selectedComplexity === index ? "is-selected-bg" : ""}
									onClick={() => {
										setSelectedComplexity(index);
									}}
								>
									{comp}
								</button>
							</li>
						))}
					</ul>
				</section>
			</nav>
		</section>
	);
}
