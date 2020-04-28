const User = require("../models/user");

exports.getUserById = (req, res, next, id) => {
	User.findById(id).exec((err, user) => {
		if (err || !user) {
			return res.status(400).json({
				error: "User not found in DB"
			});
		}
		req.profile = user;
		next();
	});
};

exports.getUser = (req, res) => {
	req.profile.salt = undefined;
	req.profile.encry_password = undefined;
	req.profile.createdAt = undefined;
	req.profile.updatedAt = undefined;
	return res.json(req.profile);
};

exports.updateUser = (req, res) => {
	// console.log(req.body);
	User.findByIdAndUpdate(
		{ _id: req.profile._id },
		{ $set: req.body },
		{ new: true, useFindAndModify: false },
		(err, user) => {
			if (err) {
				return res.status(400).json({
					error: "You are not authorized for this action"
				});
			}
			user.salt = undefined;
			user.encry_password = undefined;
			user.createdAt = undefined;
			user.updatedAt = undefined;
			res.json(user);
		}
	);
};

exports.getRecommendations = (req, res) => {
	// User.find({_id : {$ne: req.profile._id}}, {favourites: 1}, (err, arr) => {
	User.find({}, {favourites: 1}, (err, arr) => {
		console.log(arr);
		data = {}
		arr.forEach(user => {
			obj = new Object();
			user.favourites.forEach(fav => {
				obj[fav._id] = fav.rating;
			});
			data[user._id] = obj;
		});
		console.log(data);
	})
}