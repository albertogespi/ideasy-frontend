import React from "react";

import { Header } from "../components/Header";
import { Filters } from "../components/Filters";

export function Home() {
	return (
		<body>
			<Header isAccessWindow={false} isLoged={false} />
			<main className='home'>
				<Filters />
			</main>
		</body>
	);
}
