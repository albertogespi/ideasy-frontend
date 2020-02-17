import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { AuthProvider } from "./context/authContext";
import { Home } from "./pages/Home";
import { MyProfile } from "./pages/MyProfile";
import { AccessWindow } from "./pages/Access";
import { NewProject } from "./pages/NewProject";
import { Project } from "./pages/Project";
import { MyProjects } from "./pages/MyProjects";

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
					<Route path='/my-projects/:userId'>
						<MyProjects />
					</Route>
					<Route path='/my-profile'>
						<MyProfile />
					</Route>
					<Route path='/new-project'>
						<NewProject />
					</Route>
					<Route path='/project/:projectId'>
						<Project />
					</Route>
				</Switch>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
