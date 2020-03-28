import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";

const Signup = () => {
	const [values, setValues] = useState({
		name: "",
		email: "",
		password: "",
		error: "",
		success: false
	});
	const { name, email, password, error, success } = values;

	const handleChange = name => event => {
		setValues({ ...values, error: false, [name]: event.target.value });
	};

	const onSubmit = event => {
		event.preventDefault();
		setValues({ ...values, error: false });
		signup({ name, email, password })
			.then(data => {
				if (data.error) {
					setValues({ ...values, error: data.error, success: false });
				} else {
					setValues({ ...values, name: "", email: "", password: "", error: "", success: true });
				}
			})
			.catch(err => console.log("Error: ", err));
	};

	const signUpForm = () => {
		return (
			<div className="">
				<div className="row m-0 justify-content-center align-items-center">
					<div className="col-6">
						<div className="imgContainer">
							<img src="./imgs/signup.jpg" alt="signup"/>
						</div>
					</div>
					<div className="col-md-6 text-left">
						<h2 className="font-weight-bold mb-5">Lets get you all set up</h2>
						<form className="mt-5" action="">
							<div className="form-group">
								<label htmlFor="" className="text-dark">
									Name
								</label>
								<input
									className="form-control"
									onChange={handleChange("name")}
									type="text"
									value={name}
									placeholder="John Doe"
								/>
							</div>
							<div className="form-group">
								<label htmlFor="" className="text-dark">
									Email
								</label>
								<input
									className="form-control"
									onChange={handleChange("email")}
									type="email"
									value={email}
									placeholder="johnDoe@gmail.com"
								/>
							</div>
							<div className="form-group">
								<label htmlFor="" className="text-dark">
									Password
								</label>
								<input
									className="form-control"
									onChange={handleChange("password")}
									type="password"
									value={password}
									placeholder="***"
								/>
							</div>
							<button onClick={onSubmit} className="btn btn-success btn-block">
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		);
	};

	const successMsg = () => {
		return (
			<div className="row">
				<div className="col-md-6 offset-sm-3 text-left">
					<div className="alert alert-success" role="alert" style={{ display: success ? "" : "none" }}>
						Account created successfully. Please <Link to="/signin">Login here</Link>
					</div>
				</div>
			</div>
		);
	};

	const errorMsg = () => {
		return (
			<div className="row">
				<div className="col-md-6 offset-sm-3 text-left">
					<div className="alert alert-danger" role="alert" style={{ display: error ? "" : "none" }}>
						{error}
					</div>
				</div>
			</div>
		);
	};

	return (
		<Base title="Sign Up page" description="A page for user to sign up">
			{successMsg()}
			{errorMsg()}
			{signUpForm()}
			{/* <p className="text-white text-center">{JSON.stringify(values)}</p> */}
		</Base>
	);
};

export default Signup;
