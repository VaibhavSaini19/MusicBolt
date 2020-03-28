const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const { signup, signin, signout, isSignedIn } = require("../controllers/auth");

//                              SIGN UP Route
router.post("/signup", [
    check("name", "Name should be atleast 3 chars").isLength({min: 3}),
    check("email", "Email is invalid").isEmail(),
    check("password", "Password must be atleast 3 chars").isLength({min: 3})
], signup);

//                              SIGN IN Route
router.post("/signin", [
    check("email", "Email is invalid").isEmail(),
    check("password", "Password must be atleast 3 chars").isLength({min: 3})
], signin);

//                              SIGN OUT Route
router.get("/signout", signout);

//                              Test Route
router.get('/testroute', isSignedIn, (req, res) => {
    res.json(req.auth);
})


module.exports = router;
