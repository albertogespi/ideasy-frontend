import axios from "axios";

export function getUser() {
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}/users`);
}

export function updateContact() {
  return axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/contact`);
}

export function updateName() {
  return axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/name`);
}

export function updatePassword() {
  return axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/password`);
}

export function uploadAvatar() {
  return axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/avatar`);
}
