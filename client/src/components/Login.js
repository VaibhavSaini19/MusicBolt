import React, { useState, useEffect  } from "react";
import axios from 'axios';
import { setUserSession } from '../Utils/Common';

const Login = (props) => {
	const email = useFormInput('');
	const password = useFormInput('');
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	
	// handle button click of login form
	const handleLogin = () => {
		setError(null);
		setLoading(true);
		axios.post('http://localhost:5000/users/login', { email: email.value, password: password.value })
		.then(response => {
		  setLoading(false);
		  setUserSession(response.data.token, response.data.user);
		  props.history.push('/users/dashboard');
		}).catch(error => {
		  setLoading(false);
		  if (error.response.status === 400 || error.response.status === 401) setError(error.response.data.message);
		  else setError("Something went wrong. Please try again later.");
		});
	}

	let msg;
	if (props.location.state && props.location.state.redir){
		msg = props.location.state.msg;
	}
	return (
		<div className="row mt-5">
			<div className="col-md-6 m-auto">
				<div className="card">
					<div className="card-header">
						{msg && <><div className="alert alert-success alert-dismissible fade show" role="alert">
										{msg}<button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
									</div>
								</>}
						<h1 className="text-center mb-3">
							<i className="fas fa-sign-in-alt"></i> Login
						</h1>
					</div>
					<div className="card-body">
						{error && <><div className="alert alert-warning alert-dismissible fade show" role="alert">
										{error}<button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
									</div>
								</>}
						<form>
							<div className="form-group">
								<label htmlFor="email">Email</label>
								<input
									required
									{...email}
									type="email"
									id="email"
									name="email"
									className="form-control"
									placeholder="Enter Email"
								/>
							</div>
							<div className="form-group">
								<label htmlFor="password">Password</label>
								<input
									required
									{...password} 
									type="password"
									id="password"
									name="password"
									className="form-control"
									placeholder="Enter Password"
								/>
							</div>				
							<button type="submit" className="btn btn-primary btn-block" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} >
								Login
							</button>
						</form>
						<p className="lead mt-4">
							No Account? <a href="/users/register">Register</a>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}


const useFormInput = initialValue => {
	const [value, setValue] = useState(initialValue);
   
	const handleChange = e => {
		setValue(e.target.value);
	}
	return {
		value,
		onChange: handleChange
	}
}
   
export default Login;