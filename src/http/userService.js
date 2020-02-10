import axios from "axios";

export function getUser(userId) {
	return axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/${userId}`);
}

export function getProfile() {
	return axios.get(`${process.env.REACT_APP_BACKEND_URL}/users`);
}

export function updateContact(userData) {
	return axios.post(
		`${process.env.REACT_APP_BACKEND_URL}/users/contact`,
		userData,
	);
}

export function updateName(userData) {
	return axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/name`, userData);
}

export function updatePassword(userData) {
	return axios.post(
		`${process.env.REACT_APP_BACKEND_URL}/users/password`,
		userData,
	);
}

export function uploadAvatar(userData) {
	return axios.post(
		`${process.env.REACT_APP_BACKEND_URL}/users/avatar`,
		userData,
	);
}
