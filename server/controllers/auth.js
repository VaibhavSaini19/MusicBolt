const User = require("../models/user");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

exports.signup = (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({
			error: errors.array()[0].msg
		});
	}

	const user = new User(req.body);
	user.save((err, user) => {
		if (err) {
			return res.status(400).json({
				// err
				err: "Unable to save data to DB"
			});
		}
		res.json({
			id: user._id,
			name: user.name,
			email: user.email
		});
	});
};

exports.signin = (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({
			error: errors.array()[0].msg
		});
	}
	const { email, password } = req.body;
	User.findOne({ email }, (err, user) => {
		if (err) {
			return res.status(400).json({
				error: "Error while finding user in DB..."
			});
		}
		if (!user) {
			return res.status(400).json({
				error: "User email is not registered"
			});
		}
		if (!user.authenticate(password)) {
			return res.status(400).json({
				error: "Invalid Email / Password"
			});
		}

		const token = jwt.sign({ _id: user._id }, process.env.SECRET);
		res.cookie("token", token, { expire: new Date() + 9999 });
		const { _id, name, email, role, favourites } = user;
		return res.json({ token, user: { _id, name, email, role, favourites } });
	});
};

exports.signout = (req, res) => {
	res.clearCookie("token");
	res.json({
		msg: "User signout successful"
	});
};


// Protected routes
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth"
})

// Custom middlewares
exports.isAuthenticated = (req, res, next) => {
    const checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!checker){
        return res.status(403).json({
            msg: "Access Denied"
        })
    }
    next();
}

exports.isAdmin = (req, res, next) => {
	// console.log(req.profile);
    if (!req.profile.role === 0){
        return res.status(403).json({
            msg: "You are not Admin, access denied"
        })
    }
    next();
}