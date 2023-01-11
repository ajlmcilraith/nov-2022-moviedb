const router = require(`express`).Router();
const bcrypt = require(`bcrypt`)
const User = require("../models/user.model");
const jwt = require("jsonwebtoken")
//? Add your boilerplate code for a controller
//? Create a route that is a POST ("/signup")
//? Make sure route is working
//? Full url localhost:4000/user/signup

// * break down the url to two levels, first goes on the app.js and the other goes in the associated controller
// * e.g. "/user" and "/signup"

router.post("/signup", async (req, res) => {
  try {
    // * 1. create a new object based off the Model Schema (i.e. User)
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password,10)
    });
    // * 2. Try Catch - we want to try and save the data but if we get an error we want to send back the error message
    const newUser = await user.save(); //writes to the database
    // ! After we save the user we can generate a token
    const token = jwt.sign({id: newUser._id}, process.env.JWT, {expiresIn: 60*60*24}) //time is in seconds.

    res.json({
      user: newUser,
      message: "Success: User Created", 
      token: token,
    });
  } catch (error) {
    res.json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    // * 1. Check our database to see if the email that is supplied in the body is found in our database
    const user = await User.findOne({email: req.body.email})

    
    // * 2. If the document is found (aka record) in the database then validate the matching password, otherwise send a response taht we don't have a match

    if (!user) {
      throw new Error("User Not Found");
    }
    
    // = user.password === req.body.password;
    const isPasswordMatch = await bcrypt.compare(req.body.password, user.password)

    if (!isPasswordMatch) {
      throw new Error("Passwords Do Not Match");
    }
     // Pass all our checks
     const token = jwt.sign({ id: user._id }, process.env.JWT, {
      expiresIn: 60 * 60 * 24,
    });

    res.json({ user: user, message: "Success", token: token});
  } catch (error) {
    res.json({ message: error.message });
  }

})

// ! DON'T FORGET!!
module.exports = router;
