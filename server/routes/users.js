const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const utils = require('../config/utils');

// User model
const User = require("../models/User");

// Login
router.post("/login", async (req, res) => {
	const { email, password } = req.body;
	let token, userObj;

	if (!email || !password) {
		return res.status(400).json({
			error: true,
			message: "Username or Password required."
		});
	}
	
	let user = await User.findOne({email: email});
	if (!user){
		return res.status(401).json({
			error: true,
			message: "Email is not registered."
		});
	} else {
		bcrypt.compare(password.toString(), user.password, (err, isMatch) => {
			if (err){
				throw err;
			} 
			if (isMatch) {
				token = utils.generateToken(user);
				userObj = utils.getCleanUser(user);
				return res.json({ user: userObj, token });
			} else {
				return res.status(401).json({
					error: true,
					message: "Invalid Email / Password."
				});
			}
		});
	}
})

// Verify login token
router.get('/verifyToken', function (req, res) {
	var token = req.body.token || req.query.token;
	if (!token) {
	  return res.status(400).json({
		error: true,
		message: "Token is required."
	  });
	}
	jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
	  if (err) return res.status(401).json({
		error: true,
		message: "Invalid token."
	  });
	  if (user.userId !== user.userId) {
		return res.status(401).json({
		  error: true,
		  message: "Invalid user."
		});
	  }
	  var userObj = utils.getCleanUser(user);
	  return res.json({ user: userObj, token });
	});
});


// Register
router.post("/register", async (req, res) => {
	const { name, email, password, password2 } = req.body;

	if (!name || !email || !password || !password2) 
		return res.status(400).json({
			error: true,
			message: "Please fill in all the details."
		});
	if (password !== password2) 
		return res.status(400).json({
			error: true,
			message: "Passwords do not match"
		});
	if (password.length < 3) 
		return res.status(400).json({
			error: true,
			message: "Password must be atleast 3 characters long."
		});
		
	let user = await User.findOne({ email: email});
	if (user) {
		return res.status(400).json({
			error: true,
			message: "Email is already registered."
		});
	} else {
		const newUser = new User({ name, email, password });
		bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
			if (err) throw err;
			newUser.password = hash;
			newUser.save()
				.then(user => {
					return res.json({
						message: "Registered successfully"
					});
				})
				.catch(err => console.error(err));
		}));
	}
});



module.exports = router;
