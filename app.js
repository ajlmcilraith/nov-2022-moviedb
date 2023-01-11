require("dotenv").config() //This will look in our root directory for a .env file for our variables
const express = require('express');
const app = express();
const userController = require("./controllers/user.controllers")
const movieController = require("./controllers/movie.controllers");
const cors = require("cors")
// const validateSession = require("./middleware/validate-session")
// const PORT = 4000;
console.log(process.env)

// ! Connecting to the DB
const mongoose = require("mongoose")

// mongoose.connect("mongodb://localhost:27017/moviedb")
mongoose.connect(process.env.DATABASEURL)
const db = mongoose.connection

// add what is basically an event listener
db.once("open", () => console.log("Connected to the Movie DB"))



//based on certain environment variables we want to be able to change our ports/etc, so we use dotenv

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
// app.use(cors())


// app.use(express.static(`${__dirname}/public`))


app.use("/user", userController)
// We can say app.use(validateSession) here to just cover all the endpoints
// App will break on publishing if the endpoints ALSO include validateSession
// It is important to not have the validateSession above your user controller route
app.use("/movie", movieController)

app.listen(process.env.PORT, ()=>{
  console.log(`movie app is listeneing on port ${process.env.PORT}`)
})


// Define collection/table first, then move on to the routers

