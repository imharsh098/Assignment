import express from "express";
import bcrypt from "bcrypt";
const router = express.Router();
// importing models
import User from "../../models/User.js";
import sendPhone from "../../helpers/sendPhone.js";
// importing validations
import {
  errorMiddleware,
  registrationRules,
  loginRules,
} from "../../middlewares/validations/index.js";
// importing helpers
import generateToken from "../../helpers/generateToken.js";
import verifyToken from "../../middlewares/auth/index.js";

/*
      API EndPoint : /api/users/register
      Method : POST
      Payload : Request.Body - name,email,password,phone
      Access Type : Public
      Validations : 
          a) Check Valid Email,name and password
      Description : User Registration 
*/
router.post(
  "/register",
  registrationRules(),
  errorMiddleware,
  async (req, res) => {
    try {
      const { email, password } = req.body;
      const duplicate = await User.findOne({ email });
      if (duplicate) {
        return res
          .status(401)
          .json({ msg: "User already exists,please try to login" });
      }
      const newUser = new User(req.body);
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(password, salt);
      await newUser.save();
      sendPhone("Thank You for registering on our App");
      res.status(200).json({
        _id: newUser._id,
        email: newUser.email,
        token: generateToken(newUser._id),
        clientname: newUser.clientname,
        phone: newUser.phone,
        plan: newUser.plan,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  }
);

/*
      API EndPoint : /api/users/login
      Method : POST
      Payload : Request.Body - email,password
      Access Type : Public
      Validations : 
          a) Check Valid Email and verify if password is the same
      Description : User Login 
*/
router.post("/login", loginRules(), errorMiddleware, async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: "Invalid Login credentials" });
    }
    let correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
      return res.status(401).json({ msg: "Invalid Login credentials" });
    }
    res.status(200).json({
      _id: user._id,
      email: user.email,
      clientname: user.clientname,
      phone: user.phone,
      plan: user.plan,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

router.get("/myplan", verifyToken, errorMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    return res.status(200).json({ plan: user.plan });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

router.post("/newplan", verifyToken, errorMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.plan = req.body.plan;
    await user.save();
    return res.status(200).json({ plan: user.plan });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

export default router;
