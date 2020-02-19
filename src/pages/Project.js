import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/authContext";
import { SimpleRating } from "../components/Rating";

import {
	getUsersFollowingProject,
	getProject,
	followProject,
	unfollowProject,
} from "../http/projectService";
import {
	getDocuments,
	uploadDocument,
	deleteDocument,
} from "../http/documentsService";
import { Header } from "../components/Header";
import { OrgProject } from "../components/OrgProject";
import { DevProject } from "../components/DevProject";
import { Link } from "react-router-dom";

const DEVELOPER_VIEW = 2;
const OWNER_VIEW = 1;
const ONLY_READ_VIEW = 0;

export function Project() {
	const { register, formState, handleSubmit } = useForm({
		mode: "onBlur",
	});
	const { isAuth, jwt } = useAuth();

	const projectId = window.location.href.split("/")[4];

	const [isFollower, setIsFollower] = useState(undefined);
	const [myContributions, setMyContributions] = useState([]);
	const [file, setFile] = useState(undefined);

	const [project, setProject] = useState(undefined);
	const [usersFollowing, setUsersFollowing] = useState(undefined);
	const [documents, setDocuments] = useState(undefined);

	const [typeOfProfile, setTypeOfProfile] = useState(undefined);

	useEffect(() => {
		if (project !== undefined) {
			if (isAuth) {
				if (jwt.role === "dev") {
					setTypeOfProfile(DEVELOPER_VIEW);
				} else {
					if (jwt.userId === project.user_id) {
						setTypeOfProfile(OWNER_VIEW);
					} else {
						setTypeOfProfile(ONLY_READ_VIEW); // 0 = not registered person or org watching other org projects
					}
				}
			} else {
				setTypeOfProfile(ONLY_READ_VIEW);
			}
		}
	}, [project]);

	useEffect(() => {
		getProject(projectId).then((response) => {
			setProject(response.data);
		});

		getUsersFollowingProject(projectId).then((response) => {
			setUsersFollowing(response.data);
			if (isFollower !== undefined) {
				checkIsFollower(response.data);
			}
		});

		getDocuments(projectId).then((response) => {
			setDocuments(response.data);
			setMyContributions(devContributions(response.data));
		});
	}, [isFollower]);

	// useEffect(() => {
	//   console.log("aqui");
	//   if (typeOfProfile === 2 && documents !== undefined) {
	//     setMyContributions(devContributions());
	//   }
	// }, [file]);

	const checkIsFollower = (users) => {
		for (let user of users) {
			if (user.user_id === jwt.userId) {
				setIsFollower(true);
				return;
			}
		}
		setIsFollower(false);
	};
	const handleFollow = () => {
		if (isFollower) {
			unfollowProject(projectId);
			setIsFollower(false);
		} else {
			followProject(projectId);
			setIsFollower(true);
		}
	};

	const devContributions = (docs) => {
		const result = [];
		docs.map((document) => {
			if (document.user_id === jwt.userId) {
				result.push(document);
			}
		});

		return result;
	};

	const handleUpload = (formData) => {
		const data = new FormData();
		data.append("document", formData.document[0]);
		uploadDocument(data, projectId);
		setFile(undefined);
	};

	const handleDelete = (docId) => {
		deleteDocument(docId);
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
						<Link to={`/user/${project.user_id}`}>
							<li>
								<div id='small-icon' className='profile-photo'>
									<img src={project.user_avatar_url} alt=''></img>
								</div>
								<button id='org-name'>{project.user_name}</button>
							</li>
						</Link>
						<li>
							{typeOfProfile === OWNER_VIEW && <OrgProject project={project} />}
							{typeOfProfile !== OWNER_VIEW && <DevProject project={project} />}
						</li>
						<li>
							{typeOfProfile === DEVELOPER_VIEW && (
								<section>
									<p>Tus contribuciones</p>
									<section className='contributions'>
										{myContributions.map((document, index) => (
											<section id='contrib-row'>
												<a href={document.file_url}>{document.title}</a>
												<button onClick={handleDelete(document.doc_id)}>eliminar</button>
											</section>
										))}
									</section>
									<form onSubmit={handleSubmit(handleUpload)}>
										<fieldset>
											<label for='contributions' id='document'>
												{file ? file.name : "Seleccionar archivo"}
											</label>
											<input
												type='file'
												id='contributions'
												name='document'
												accept='pdf'
												ref={register}
												onChange={(e) => {
													setFile(e.target.files[0]);
												}}
											></input>
										</fieldset>
										<button type='submit' disabled={formState.isSubmitting}>
											Subir archivo
										</button>
									</form>
								</section>
							)}
							{typeOfProfile === OWNER_VIEW && (
								<section>
									<p>Contribuciones</p>
									<section className='contributions'>
										{documents.map((document, index) => (
											<div id='contrib-row'>
												<Link id='link' to={`/user/${document.user_id}`}>
													<button>
														<div id='small-icon' className='profile-photo'>
															<img src={document.user_avatar_url} alt=''></img>
														</div>
														<p>{document.user_name}</p>
													</button>
												</Link>
												<a href={document.file_url}>{document.title}</a>
												<div className='centered-container'>
													<SimpleRating
														readOnly={false}
														value={document.rating}
														docId={document.doc_id}
														key={document.doc_id}
														id='stars'
													/>
												</div>
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
									<Link to={`/user/${user.user_id}`} key={index}>
										<button>
											<div id='small-icon' className='profile-photo'>
												<img src={user.avatar_url} alt='' />
											</div>
											<p>{user.name}</p>
										</button>
									</Link>
								))}
							</section>
						</li>
						<li id='bottom'>
							{typeOfProfile === DEVELOPER_VIEW && (
								<button onClick={handleFollow}>
									{isFollower ? "Dejar de seguir proyecto" : "Seguir proyecto"}
								</button>
							)}
							{typeOfProfile === OWNER_VIEW && <button>Cerrar proyecto</button>}
						</li>
					</ul>
				</section>
			</section>
		);
	} else {
		return <p>Cargando proyecto...</p>;
	}
}
