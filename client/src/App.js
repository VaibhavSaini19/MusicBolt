import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { StoreProvider, createStore } from 'easy-peasy';
import Header from './components/Header';
import Landing from './components/Landing';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';
import axios from 'axios';
import { getToken, removeUserSession, setUserSession } from './Utils/Common';
import "./App.css";


function App() {

const [authLoading, setAuthLoading] = useState(true);
 
  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }
 
    axios.get(`http://localhost:5000/users/verifyToken?token=${token}`).then(response => {
      setUserSession(response.data.token, response.data.user);
      setAuthLoading(false);
    }).catch(error => {
      removeUserSession();
      setAuthLoading(false);
    });
  }, []);
 
  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }

	return (
		<Router>
			<div className="App">
				<Header />
				<Route exact path="/" component={Landing} />				{/* Import these first */}
				<Route path="/users/register" component={Register} />
				<PublicRoute path="/users/login" component={Login} />
				<PrivateRoute path="/users/dashboard" component={Dashboard} />
			</div>
		</Router>
	);
}

export default App;
