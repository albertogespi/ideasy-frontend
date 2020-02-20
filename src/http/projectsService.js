import axios from "axios";

export function getContributedProjects(userId, queryValues) {
	return axios.get(
		`${process.env.REACT_APP_BACKEND_URL}/projects/contributed/${userId}${queryValues}`,
	);
}

export function getFollowedProjects(userId, queryValues) {
	return axios.get(
		`${process.env.REACT_APP_BACKEND_URL}/projects/followed/${userId}${queryValues}`,
	);
}

export function getAvgRatings(userId) {
	return axios.get(
		`${process.env.REACT_APP_BACKEND_URL}/projects/ratings/${userId}`,
	);
}

export function getOrgProjects(userId, queryValues) {
	return axios.get(
		`${process.env.REACT_APP_BACKEND_URL}/projects/${userId}${queryValues}`,
	);
}

export function createProject(projectData) {
	return axios.post(
		`${process.env.REACT_APP_BACKEND_URL}/projects/new`,
		projectData,
	);
}
