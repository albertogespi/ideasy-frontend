import axios from 'axios';

export function uploadDocument(projectId) {
  return axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/documents/projects/:projectId/${projectId}`
  );
}

export function getDocuments(projectId) {
  return axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/documents/projects/:projectId/${projectId}`
  );
}

export function uploadRating(docId) {
  return axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/documents/:docId/${docId}`
  );
}

export function deleteDocument(docId) {
  return axios.delete(
    `${process.env.REACT_APP_BACKEND_URL}/documents/:docId/${docId}`
  );
}
