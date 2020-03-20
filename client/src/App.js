import React from "react";
import model from './model';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { StoreProvider, createStore } from 'easy-peasy';
import Header from './components/Header';
import Landing from './components/Landing';
import Register from './components/Register';
import Login from './components/Login';
import "./App.css";

const store = createStore(model);

function App() {
	return (
		<Router>
			<div className="App">
				<Header />
				<Route exact path="/" component={Landing} />				{/* Import these first */}
				<Route path="/users/register" component={Register} />
				<Route path="/users/login" component={Login} />
			</div>
		</Router>
	);
}

export default App;
