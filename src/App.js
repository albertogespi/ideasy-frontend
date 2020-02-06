import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
//import './App.css';
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
