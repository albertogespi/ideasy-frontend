import axios from 'axios';

export function getHomeProjects() {
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}/home`);
}

export function getProjectsOrdered(projectId) {
  return axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/home/:projectsOrder/${projectId}`
  );
}
