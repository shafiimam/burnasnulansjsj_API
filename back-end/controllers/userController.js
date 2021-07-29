import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import randString from "../utils/randString.js";
import sendEmail from "../utils/sendEmail.js";
//@desc auth user and get token
//@route post api/v1/login
//@access public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isAdmin: user.isAdmin,
      isVerified: user.isVerified,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email and password");
  }
});

//@desc register new userModel
//@route post api/v1/user
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, phone, password } = req.body;
  const isVerified = false;
  const uniqueString = randString();
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    phone,
    password,
    uniqueString,
    isVerified,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isAdmin: user.isAdmin,
      isVerified: user.isVerified,
      token: generateToken(user._id),
    });
    sendEmail(email, uniqueString);
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});
//@desc get verify user email
//@route api/v1/verify/:uniqueString
//@access public
const verifyUserEmail = asyncHandler(async (req, res) => {
  const uniqueString = req.params.uniqueString;
  const user = await User.findOne({ uniqueString: uniqueString });
  if (user) {
    user.isVerified = true;
    await user.save();
    res.status(200);
    res.json({ message: "Email verified successfully" });
  } else {
    res.json("user not found");
  }
});

//@desc get user profile
//@route get api/v1/user
//@access private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
//@desc update user profile
//@route put api/v1/user
//@access private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc delete an user
//@route api/v1/user
//@access private admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: "User removed successfully" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
  res.json(user);
});

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  verifyUserEmail,
};
