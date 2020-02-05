import axios from "axios";

export function getContributedProjects(userId) {
	return axios.get(
		`${process.env.REACT_APP_BACKEND_URL}/projects/contributed/${userId}`,
	);
}

export function getFollowedProjects(userId) {
	return axios.get(
		`${process.env.REACT_APP_BACKEND_URL}/projects/followed/${userId}`,
	);
}

export function getAvgRatings(userId) {
	return axios.get(
		`${process.env.REACT_APP_BACKEND_URL}/projects/ratings/${userId}`,
	);
}

export function getOrgProjects(userId) {
	return axios.get(`${process.env.REACT_APP_BACKEND_URL}/projects/${userId}`);
}

export function createProject(project) {
	return axios.post(
		`${process.env.REACT_APP_BACKEND_URL}/projects/new`,
		project,
	);
}
