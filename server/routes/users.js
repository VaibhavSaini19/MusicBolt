const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

// User model
const User = require("../models/User");

// Login Page
router.get("/login", (req, res) => res.send("Login"));


// Register
router.post("/register", async (req, res) => {
	const { name, email, password, password2 } = req.body;
	let errors = {}, registered=false;

	// check required fields
	if (!name || !email || !password || !password2) errors['required'] = "Please fill in all fields";
	if (password !== password2) errors['pwNotMatch'] = "Passwords do not match";
	if (password.length < 3) errors['pwLen'] = "Passwords should be atleast 3 characters";

	const valid = Object.keys(errors).length == 0 ? true : false;
	if (valid) {
		let user = await User.findOne({ email: email});
		if (user) {
			errors['exists'] = "Email already registered";
			res.send({registered: false, errors});
		} else {
			const newUser = new User({ name, email, password });
			bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
				if (err) throw err;
				newUser.password = hash;
				newUser.save()
					.then(user => res.send({registered: true, errors}))
					.catch(err => console.error(err));
			}));
		}
	} else {
		res.send({registered, errors});
	}
	// console.log('Recived at server:'+req.body);
});

module.exports = router;
