import axios from "axios";

export function getHomeProjects(queryValues) {
	return axios.get(`${process.env.REACT_APP_BACKEND_URL}/home${queryValues}`);
}

export function getProjectsOrdered(projectId) {
	return axios.get(
		`${process.env.REACT_APP_BACKEND_URL}/home/:projectsOrder/${projectId}`,
	);
}
