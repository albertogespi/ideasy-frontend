import React from "react";

export function Filters({
	categories,
	complexities,
	selectedCategory,
	setSelectedCategory,
	selectedComplexity,
	setSelectedComplexity,
}) {
	return (
		<section className='filters'>
			<nav>
				<section id='category'>
					<p>Categoría</p>
					<ul>
						{categories.map((cat, index) => (
							<li key={index}>
								<button
									id={selectedCategory === index ? "is-selected" : ""}
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
					<p>Complejidad</p>
					<ul>
						{complexities.map((comp, index) => (
							<li key={index}>
								<button
									id={selectedComplexity === index ? "is-selected" : ""}
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
