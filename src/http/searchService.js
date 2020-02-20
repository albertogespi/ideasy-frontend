import axios from "axios";

export function getSearchResults(url, queryValues) {
	return axios.get(`${url}/${queryValues}`);
}
