import React from "react";
//import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { AuthProvider } from "./context/authContext";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { MyProfile } from "./pages/MyProfile";
import { Register } from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/register-login">
            <Register />
            <Login />
          </Route>
          <Route path="/my-profile">
            <MyProfile />
          </Route>
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
