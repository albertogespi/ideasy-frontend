import React, { useState } from "react";

export function Filters() {
	const [currentSelected, setSelected] = useState(0);

	const categories = [
		"Todos",
		"Blog",
		"e-Commerce",
		"e-Learning",
		"Corporativa",
		"Noticias",
		"Wikis",
	];

	return (
		<section className='filters'>
			<nav>
				<section id='category'>
					<p>Categoría</p>
					<ul>
						{categories.map((cat, index) => (
							<li>
								<button
									id={currentSelected === index ? "is-selected" : ""}
									onClick={() => {
										setSelected(index);
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
						<li>
							<button>Fácil</button>
						</li>
						<li>
							<button>Media</button>
						</li>
						<li>
							<button>Difícil</button>
						</li>
					</ul>
				</section>
			</nav>
		</section>
	);
}
