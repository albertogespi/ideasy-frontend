import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Selects } from "../components/Selects";
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
import CircularProgress from '@material-ui/core/CircularProgress';
import {useMatchMedia} from "../hooks/useMatchMedia";

export function MyProjects() {
	const isMobile = useMatchMedia("(max-width:1110px)");

	const { jwt } = useAuth();

	let isOrgProfile = jwt.role === "org";

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
	const [selectsState, setSelectsState] = useState({
		category: '',
		complexity: '',
	  });

	const history = useHistory();

	let historyQuery = "";
	const updateQuery = () => {
		console.log(selectsState);
		  if (selectsState.category !== '') {
			historyQuery += `/?category=${selectsState.category}`;
		  }
	  
		  if (selectsState.complexity !== '') {
			if (historyQuery === "") {
			  historyQuery += `/?complexity=${selectsState.complexity}`;
			} else {
			  historyQuery += `&complexity=${selectsState.complexity}`;
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
	}, [selectsState, buttonSelected]);

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
					{isMobile && (isOrgProfile ? (<div className='centered-container' id='new-project-button'>
								<Link to='/new-project'>
									<button
										id='new-project'
										aria-label='Click para crear un nuevo proyecto.'
									></button>
								</Link>
								<p>Nuevo proyecto</p>
							</div>) : (<div className='centered-container' id='my-projects-rating'>
								<SimpleRating readOnly={true} value={rating} id='stars' />
								<p>Mi puntuación media</p>
								{rating
									? `${rating} ${
											rating === 1 ? "estrella" : "estrellas"
									  } / ${numberOfContributions} ${
											numberOfContributions === 1 ? "contribución" : "contribuciones"
									  }`
									: "Este usuario aún no ha recibido puntuaciones"}
							</div>))}
					<Selects isFilters={true} selectsState={selectsState} setSelectsState={setSelectsState}/>
					{isOrgProfile ? (
						<section className='projects-container'>
							{!isMobile && <div className='centered-container' id='new-project-button'>
								<Link to='/new-project'>
									<button
										id='new-project'
										aria-label='Click para crear un nuevo proyecto.'
									></button>
								</Link>
								<p>Nuevo proyecto</p>
							</div>}
							<MyProjectsOrg
								projects={orgProjects}
								buttonSelected={buttonSelected}
								setButtonSelected={setButtonSelected}
							/>
						</section>
					) : (
						<section className='projects-container'>
							{!isMobile && <div className='centered-container' id='my-projects-rating'>
								<SimpleRating readOnly={true} value={rating} id='stars' />
								<p>Mi puntuación media</p>
								{rating
									? `${rating} ${
											rating === 1 ? "estrella" : "estrellas"
									  } / ${numberOfContributions} ${
											numberOfContributions === 1 ? "contribución" : "contribuciones"
									  }`
									: "Este usuario aún no ha recibido puntuaciones"}
							</div>}
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
		return <div className="centered-container" id="spinner"><CircularProgress size={'4rem'}/></div>;
	}
}
