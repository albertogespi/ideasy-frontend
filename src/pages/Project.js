import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/authContext";
import {
	getUsersFollowingProject,
	getProject,
	followProject,
} from "../http/projectService";
import { getDocuments } from "../http/documentsService";
import { Header } from "../components/Header";
import { OrgProject } from "../components/OrgProject";
import { DevProject } from "../components/DevProject";

export function Project() {
	const { register } = useForm({
		mode: "onBlur",
	});
	const { isAuth, jwt } = useAuth();

	const projectId = window.location.href.split("/")[4];

	const [isFollower, setIsFollower] = useState();
	const [myContributions, setMyContributions] = useState([]);

	const [project, setProject] = useState(undefined);
	const [usersFollowing, setUsersFollowing] = useState(undefined);
	const [documents, setDocuments] = useState(undefined);

	const [typeOfProfile, setTypeOfProfile] = useState(undefined);

	useEffect(() => {
		if (project !== undefined) {
			if (isAuth) {
				if (jwt.role === "dev") {
					setTypeOfProfile(2);
				} else {
					if (jwt.userId === project.user_id) {
						setTypeOfProfile(1);
					} else {
						setTypeOfProfile(0); // 0 = not registered person or org watching other org projects
					}
				}
			} else {
				setTypeOfProfile(0);
			}
		}
	}, [project]);

	useEffect(() => {
		getProject(projectId).then((response) => {
			setProject(response.data);
		});

		getUsersFollowingProject(projectId).then((response) => {
			setUsersFollowing(response.data);
		});

		getDocuments(projectId).then((response) => {
			setDocuments(response.data);
		});

		console.log("aqui");
	}, []);

	useEffect(() => {
		if (typeOfProfile === 2 && documents !== undefined) {
			console.log("aca");
			setMyContributions(devContributions());
		}
	}, [documents]);

	const handleFollow = () => {
		followProject(projectId);
		setIsFollower(true);
	};

	const devContributions = () => {
		const result = [];
		documents.map((document) => {
			if (document.user_id === jwt.userId) {
				result.push(document);
			}
		});

		return result;
	};

	if (
		project !== undefined &&
		documents !== undefined &&
		usersFollowing !== undefined &&
		myContributions !== undefined &&
		typeOfProfile !== undefined
	) {
		return (
			<section className='container'>
				<Header isAccessWindow={false} />
				<section className='project'>
					<ul>
						<li>
							<div id='medium-icon' className='profile-photo'>
								<img src={project.user_avatar_url} alt=''></img>
							</div>
							<button id='org-name'>{project.user_name}</button>
						</li>
						<li>
							{typeOfProfile === 1 && <OrgProject project={project} />}
							{typeOfProfile !== 1 && <DevProject project={project} />}
						</li>
						<li>
							{typeOfProfile === 2 && (
								<form>
									<fieldset>
										<legend>Tus contribuciones</legend>
										<section className='contributions'>
											{myContributions.map((document, index) => (
												<section id='contrib-row'>
													<a href={document.file_url}>{document.title}</a>
													<button>eliminar</button>
												</section>
											))}
										</section>
										<label for='contributions'>Sube una propuesta</label>
										<input
											type='file'
											id='contributions'
											name='contributions'
											accept='pdf'
											ref={register}
										></input>
									</fieldset>
								</form>
							)}
							{typeOfProfile === 1 && (
								<section>
									<p>Contribuciones</p>
									<section className='contributions'>
										{documents.map((document, index) => (
											<div id='contrib-row'>
												<button>
													<div id='small-icon' className='profile-photo'>
														<img src={document.user_avatar_url} alt=''></img>
													</div>
													<p>{document.user_name}</p>
												</button>
												<a href={document.file_url}>{document.title}</a>
												<div>{document.rating} estrellas</div>
											</div>
										))}
									</section>
								</section>
							)}
						</li>
						<li>
							<p>Seguidores de este proyecto</p>
							<section className='followers'>
								{usersFollowing.map((user, index) => (
									<button>
										<div id='small-icon' className='profile-photo'>
											<img src={user.avatarUrl} alt='' />
										</div>
										<p>{user.name}</p>
									</button>
								))}
							</section>
						</li>
						<li id='bottom'>
							{typeOfProfile === 2 && (
								<button onClick={handleFollow}>
									{isFollower ? "Dejar de seguir proyecto" : "Seguir proyecto"}
								</button>
							)}
							{typeOfProfile === 1 && <button>Cerrar proyecto</button>}
						</li>
					</ul>
				</section>
			</section>
		);
	} else {
		return <p>Internet va lento, espere</p>;
	}
}
