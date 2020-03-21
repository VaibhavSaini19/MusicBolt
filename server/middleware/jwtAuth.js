const jwtAuth = (req, res, next) => {
	var token = req.headers['authorization'];
    if (!token) return next(); //if no token, continue
        
    token = token.replace('Bearer ', '');
    jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
        if (err) {
        return res.status(401).json({
            error: true,
            message: "Invalid user."
        });
        } else {
        req.user = user; //set the user to req so other routes can use it
        next();
        }
    });
};


module.exports = jwtAuth