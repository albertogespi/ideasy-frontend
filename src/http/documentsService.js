import axios from "axios";

export function uploadDocument(docData, projectId) {
	return axios.post(
		`${process.env.REACT_APP_BACKEND_URL}/documents/projects/${projectId}`,
		docData,
	);
}

export function getDocuments(projectId) {
	return axios.get(
		`${process.env.REACT_APP_BACKEND_URL}/documents/projects/${projectId}`,
	);
}

export function uploadRating(docData, projectId) {
	return axios.post(
		`${process.env.REACT_APP_BACKEND_URL}/documents/${projectId}`,
		docData,
	);
}

export function deleteDocument(docId) {
	return axios.delete(`${process.env.REACT_APP_BACKEND_URL}/documents/${docId}`);
}
