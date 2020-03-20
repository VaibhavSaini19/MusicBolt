const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

// User model
const User = require("../models/User");

// Login Page
router.get("/login", (req, res) => res.send("Login"));
// Register
router.post("/register", (req, res) => {
	const { name, email, password, password2 } = req.body;
	let errors = [];

	// check required fields
	if (!name || !email || !password || !password2) errors.push({ msg: "Please fill in all fields" });
	if (password !== password2) errors.push({ msg: "Passwords don not match" });
	if (password.length < 3) errors.push({ msg: "Passwords should be atleast 3 characters" });

	const valid = errors.length == 0 ? true : false;
	if (valid) {
		User.findOne({ email: email }).then(user => {
			if (user) {
				// user exists
				errors.push({ msg: "Email already registered" });
			} else {
				const newUser = new User({
					name,
					email,
					password
				});
				bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => res.send(true))
                        .catch(err => console.error(err));
                }));
			}
		});
	}
	res.send(false);

	// console.log('Recived at server:'+req.body);
});

module.exports = router;
