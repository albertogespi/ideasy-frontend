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
	const {
		register,
		errors,
		formState,
		handleSubmit,
		setError,
		setValue,
	} = useForm({
		mode: "onBlur",
	});

	const { currentUser, jwt } = useAuth();

	const projectId = window.location.href.split("/")[4];

	console.log(projectId);

	let isOrgProfile = jwt.role === "org";

	const [isFollower, setIsFollower] = useState();

	const [usersFollowing, setUsersFollowing] = useState([]);
	const [project, setProject] = useState(undefined);
	const [documents, setDocuments] = useState(undefined);

	useEffect(() => {
		getUsersFollowingProject(projectId).then((response) => {
			setUsersFollowing(response.data);
		});

		getProject(projectId).then((response) => setProject(response.data));
		getDocuments(projectId).then((response) => setDocuments(response.data));
	}, []);

	const handleFollow = () => {
		followProject(projectId);
		setIsFollower(true);
	};

	if (project === undefined || documents === undefined) {
		return <p>Internet va lento, espere</p>;
	}
	if (project === null) {
		return <p>Nada para ver, no existe, no se</p>;
	}

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
						{isOrgProfile && <OrgProject project={project} />}
						{!isOrgProfile && <DevProject project={project} />}
					</li>
					<li>
						{!isOrgProfile && (
							<form>
								<fieldset>
									<legend>Tus contribuciones</legend>
									<section id='contrib-row' className='contributions'>
										<p>nombre del archivo</p>
										<button>eliminar</button>
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
						{isOrgProfile && (
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
						{!isOrgProfile && (
							<button onClick={handleFollow}>
								{isFollower ? "Dejar de seguir proyecto" : "Seguir proyecto"}
							</button>
						)}
						{isOrgProfile && <button>Cerrar proyecto</button>}
					</li>
				</ul>
			</section>
		</section>
	);
}
