import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  clientname: {
    type: String,
    required: true,
    minlength: 2,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  phone: {
    type: Number,
    required: true,
    minlength: 10,
    unique: true,
  },
  plan: {
    type: String,
    required: true,
  },
});

const userModel = new mongoose.model("User", userSchema, "users");

export default userModel;
