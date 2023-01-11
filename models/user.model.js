const mongoose = require("mongoose")

// create a new schema
const UserSchema = new mongoose.Schema({
  // * Create the columns Here for the Collection
  firstName: {
    type: String,
    required: true, //This defaults to false 
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
})


//This will create a users collection and add our user schema
module.exports = mongoose.model("User", UserSchema)