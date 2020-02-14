import axios from "axios";

export function uploadDocument(docData) {
	return axios.post(
		`${process.env.REACT_APP_BACKEND_URL}/documents/projects/${docData.id}`,
		docData,
	);
}

export function getDocuments(projectId) {
	return axios.get(
		`${process.env.REACT_APP_BACKEND_URL}/documents/projects/${projectId}`,
	);
}

export function uploadRating(docData) {
	return axios.post(
		`${process.env.REACT_APP_BACKEND_URL}/documents/${docData.id}`,
		docData,
	);
}

export function deleteDocument(docId) {
	return axios.delete(`${process.env.REACT_APP_BACKEND_URL}/documents/${docId}`);
}
