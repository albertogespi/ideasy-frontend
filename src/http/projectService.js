import axios from "axios";

export function getUsersFollowingProject(projectId) {
	return axios.get(
		`${process.env.REACT_APP_BACKEND_URL}/project/followers/${projectId}`,
	);
}

export function followProject(projectId) {
	return axios.post(
		`${process.env.REACT_APP_BACKEND_URL}/project/followers/${projectId}`,
	);
}

export function unfollowProject(projectId) {
	return axios.delete(
		`${process.env.REACT_APP_BACKEND_URL}/project/followers/${projectId}`,
	);
}

export function getProject(projectId) {
	return axios.get(`${process.env.REACT_APP_BACKEND_URL}/project/${projectId}`);
}

export function closeProject(projectId) {
	return axios.post(`${process.env.REACT_APP_BACKEND_URL}/project/${projectId}`);
}

export function updateProject(projectData, projectId) {
	return axios.put(
		`${process.env.REACT_APP_BACKEND_URL}/project/${projectId}`,
		projectData,
	);
}
