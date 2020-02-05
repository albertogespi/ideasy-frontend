import axios from "axios";

export function createAccount(accountData) {
	return axios.post(
		`${process.env.REACT_APP_BACKEND_URL}/account/new`,
		accountData,
	);
}

export function deleteAccount() {
	return axios.delete(`${process.env.REACT_APP_BACKEND_URL}/account`);
}
