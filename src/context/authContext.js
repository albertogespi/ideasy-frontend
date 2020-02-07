import React, { useContext, useState } from "react";
//import jwt_decode from "jwt-decode";

const AuthContext = React.createContext();

//const storedUser = JSON.parse(localStorage.getItem("currentUser"));

export function AuthProvider({ children }) {
  const [jwt, setJwt] = useState();
  const [currentUser, setCurrentUser] = useState();

  return (
    <AuthContext.Provider value={{ jwt, setJwt, currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
