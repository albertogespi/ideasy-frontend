import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
//import './App.css';
import { Register } from "./pages/Register";

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path='/register'>
					<Register />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
