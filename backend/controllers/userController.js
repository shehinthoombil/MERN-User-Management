import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';


// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImg: user.profileImg
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }

});



// @desc    Register a new user
// @route   POST /api/users/auth
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const profileImg = "images.181-1814767_person-svg-png-icon-free-download-profile-icon.png"

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    profileImg
  });

  if (user) {
    generateToken(res, user._id)
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImg: user.profileImg
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }


});

// @desc    Logout user
// @route   POST /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });

});

// @desc    Get user profile
// @route   POST /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImg: user.profileImg
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }

});

// @desc    update user profile
// @route   POST /api/users/pofile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const setUserProfile = asyncHandler(async (req, res) => {

  try {
    const { url, id } = req.body;

    const user = await User.findById(id);

    if (user) {
      user.profileImg = url;

      await user.save();

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        profileImg: user.profileImg
      })

    } else {
      res.status(404);
      throw new Error('User not found');
    }

  } catch (error) {

  }
})

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  setUserProfile

};