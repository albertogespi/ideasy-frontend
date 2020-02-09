import React from "react";
//import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { AuthProvider } from "./context/authContext";
import { Home } from "./pages/Home";
import { MyProfile } from "./pages/MyProfile";
import { AccessWindow } from "./pages/Access";

function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<Switch>
					<Route exact path='/'>
						<Home />
					</Route>
					<Route path='/access'>
						<AccessWindow />
					</Route>
					<Route path='/my-profile'>
						<MyProfile />
					</Route>
				</Switch>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
