import React, { useContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

const AuthContext = React.createContext();

const storedUser = JSON.parse(localStorage.getItem("currentUser"));

export function AuthProvider({ children }) {
	const [isAuth, setIsAuth] = useState(storedUser !== null);
	const [jwt, setJwt] = useState();
	const [currentUser, setCurrentUser] = useState(storedUser);

	return (
		<AuthContext.Provider
			value={{ isAuth, setIsAuth, jwt, setJwt, currentUser, setCurrentUser }}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	return context;
}
