import React, { Component } from "react";
import { Redirect } from 'react-router-dom';

export default class Register extends Component {
	state = {
		name: '', 
		email: '',
		password: '',
		password2: '',
		registered: false,
		errors: {}
	}

	onChange = (e) => {
		this.setState({[e.target.name]: e.target.value});
	}

	onSubmit = async (e) => {
		e.preventDefault();
		const options = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json'},
			body: JSON.stringify(this.state)
		}
		fetch('http://localhost:5000/users/register', options)
		.then(response => response.json())
		// .then(res => console.log(res));
		.then(res => {
			console.log("Res: ", res);
			if (res.registered == true) {
				this.setState({registered: true});
			} else {
				this.setState({errors: res.errors});
			}
		});
	}

	render() {
		if (this.state.registered === true)
			return <Redirect to={'login'} />
		let errors = this.state.errors;
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
							<div className="bg-warning p-1 my-1 rounded" style={{ display: (errors.required ? 'block' : 'none') }}>{errors.required}</div>
							<div className="bg-warning p-1 my-1 rounded" style={{ display: (errors.pwNotMatch ? 'block' : 'none') }}>{errors.pwNotMatch}</div>
							<div className="bg-warning p-1 my-1 rounded" style={{ display: (errors.pwLen ? 'block' : 'none') }}>{errors.pwLen}</div>
							<div className="bg-warning p-1 my-1 rounded" style={{ display: (errors.exists ? 'block' : 'none') }}>{errors.exists}</div>
							<form onSubmit={this.onSubmit} method="POST">
								<div className="form-group">
									<label htmlFor="name">Name</label>
									<input
										type="name"
										id="name"
										name="name"
										className="form-control"
										placeholder="Enter Name"
										onChange={this.onChange}
										value={this.state.name}
										// value={typeof name != 'undefined' ? name : ''}
									/>
								</div>
								<div className="form-group">
									<label htmlFor="email">Email</label>
									<input
										type="email"
										id="email"
										name="email"
										className="form-control"
										placeholder="Enter Email"
										onChange={this.onChange}
										value={this.state.email}
										// value={typeof email != 'undefined' ? email : ''}
									/>
								</div>
								<div className="form-group">
									<label htmlFor="password">Password</label>
									<input
										type="password"
										id="password"
										name="password"
										className="form-control"
										placeholder="Create Password"
										onChange={this.onChange}
										value={this.state.password}
										// value={typeof password != 'undefined' ? password : ''}
									/>
								</div>
								<div className="form-group">
									<label htmlFor="password2">Confirm Password</label>
									<input
										type="password"
										id="password2"
										name="password2"
										className="form-control"
										placeholder="Confirm Password"
										onChange={this.onChange}
										value={this.state.password2}
										// value={typeof password2 != 'undefined' ? password2 : ''}
									/>
								</div>
								<button type="submit" className="btn btn-primary btn-block">
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
}
