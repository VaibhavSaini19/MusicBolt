import React from "react";
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Header from './components/Header';
import Landing from './components/Landing';
import About from './components/About';
import "./App.css";

function App() {
	return (
		<Router>
			<div className="App">
				<Header />
				<Route exact path="/" component={Landing} />				{/* Import these first */}
				<Route path="/about" component={About} />
			</div>
		</Router>
	);
}

export default App;
