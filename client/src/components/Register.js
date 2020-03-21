import React, { useState, useEffect } from "react";
import axios from 'axios';
import { setUserSession } from '../Utils/Common';

const Register = (props) => {
	const name = useFormInput('');
	const email = useFormInput('');
	const password = useFormInput('');
	const password2 = useFormInput('');
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	
	// handle button click of registration form
	const handleRegister = () => {
		setError(null);
		setLoading(true);
		axios.post('http://localhost:5000/users/register', { name: name.value, email: email.value, password: password.value, password2: password2.value })
		.then(response => {
		  setLoading(false);
		  props.history.push({
			  pathname: '/users/login',
			  state: {redir: true, msg: response.data.message}
			});
		}).catch(error => {
		  setLoading(false);
		  if (error.response.status === 400 || error.response.status === 401) setError(error.response.data.message);
		  else setError("Something went wrong. Please try again later.");
		});
	}

	return (
		<div className="row mt-5">
			<div className="col-md-6 m-auto">
				<div className="card">
					<div className="card-header">
						<h1 className="text-center">
							<i className="fas fa-user-plus"></i> Register
						</h1>
					</div>
					<div className="card-body">
						{error && <><div className="alert alert-warning alert-dismissible fade show" role="alert">
										{error}<button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
									</div>
								</>}
						<form>
							<div className="form-group">
								<label htmlFor="name">Name</label>
								<input
									required
									{...name}
									type="name"
									id="name"
									name="name"
									className="form-control"
									placeholder="Enter Name"
								/>
							</div>
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
									placeholder="Create Password"
								/>
							</div>
							<div className="form-group">
								<label htmlFor="password2">Confirm Password</label>
								<input
									required
									{...password2}
									type="password"
									id="password2"
									name="password2"
									className="form-control"
									placeholder="Confirm Password"
								/>
							</div>
							<button type="submit" className="btn btn-primary btn-block" value={loading ? 'Loading...' : 'Register'} onClick={handleRegister} disabled={loading} >
								Register
							</button>
						</form>
						<p className="lead mt-4">
							Have An Account? <a href="/users/login">Login</a>
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
   
export default Register;