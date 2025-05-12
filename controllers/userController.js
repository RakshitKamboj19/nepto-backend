import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import createToken from "../utils/createToken.js";
import { sendWelcomeEmail, sendLoginNotificationEmail, sendPasswordResetEmail } from "../utils/emailService.js";

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please fill all the inputs.");
  }

  try {
    // Simplified user existence check
    const userExists = await User.findOne({ email });
    
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create new user with both username and name fields
    const newUser = new User({
      username,
      name: username,
      email,
      password: hashedPassword,
      isAdmin: false
    });

    // Save user to database
    const savedUser = await newUser.save();
    
    // Generate JWT token
    createToken(res, savedUser._id);

    // Send welcome email to the new user
    try {
      console.log('Sending welcome email for new user:', savedUser.email);
      const emailSent = await sendWelcomeEmail(savedUser.username, savedUser.email);
      console.log('Welcome email status:', emailSent ? 'Sent successfully' : 'Failed to send');
    } catch (emailError) {
      console.error('Error in welcome email process:', emailError);
      // Continue with registration even if email fails
    }

    // Send success response
    res.status(201).json({
      _id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      isAdmin: savedUser.isAdmin,
    });
  } catch (error) {
    res.status(400);
    throw new Error("Registration failed: " + error.message);
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Find user by email
    const existingUser = await User.findOne({ email });
    
    if (!existingUser) {
      res.status(401);
      throw new Error("Invalid email or password");
    }
    
    // Check password
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    
    if (!isPasswordValid) {
      res.status(401);
      throw new Error("Invalid email or password");
    }
    
    // Generate JWT token
    createToken(res, existingUser._id);
    
    // Use username or name field depending on what's available
    const username = existingUser.username || existingUser.name;
    
    // Send login notification email
    try {
      console.log('Sending login notification email for user:', existingUser.email);
      const emailSent = await sendLoginNotificationEmail(username, existingUser.email);
      console.log('Login notification email status:', emailSent ? 'Sent successfully' : 'Failed to send');
    } catch (emailError) {
      console.error('Error in login notification email process:', emailError);
      // Continue with login even if email fails
    }
    
    // Send success response
    res.status(200).json({
      _id: existingUser._id,
      username: username,
      email: existingUser.email,
      isAdmin: existingUser.isAdmin,
    });
  } catch (error) {
    res.status(res.statusCode === 200 ? 401 : res.statusCode);
    throw new Error(error.message || "Login failed");
  }
});

const logoutCurrentUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});

const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Cannot delete admin user");
    }

    await User.deleteOne({ _id: user._id });
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// Request password reset - generates token and sends email
const requestPasswordReset = asyncHandler(async (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    res.status(400);
    throw new Error("Please provide your email address");
  }
  
  try {
    // Find user by email
    const user = await User.findOne({ email });
    
    if (!user) {
      res.status(404);
      throw new Error("User not found with this email address");
    }
    
    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    
    // Hash token before saving to database
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    
    // Set token expiry (10 minutes)
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    
    await user.save();
    
    // Create reset URL
    const resetUrl = `${req.protocol}://${req.get('host')}/reset-password`;
    
    // Send password reset email
    const emailSent = await sendPasswordResetEmail(
      user.username || user.name,
      user.email,
      resetToken,
      resetUrl
    );
    
    if (emailSent) {
      res.status(200).json({ 
        message: "Password reset link sent to your email address",
        success: true 
      });
    } else {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();
      
      res.status(500);
      throw new Error("Failed to send password reset email");
    }
  } catch (error) {
    res.status(res.statusCode === 200 ? 500 : res.statusCode);
    throw new Error(error.message || "Password reset request failed");
  }
});

// Reset password with token
const resetPassword = asyncHandler(async (req, res) => {
  const { token, password } = req.body;
  
  if (!token || !password) {
    res.status(400);
    throw new Error("Please provide token and new password");
  }
  
  try {
    // Hash the token from the URL
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');
    
    // Find user with the hashed token and valid expiry
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }
    });
    
    if (!user) {
      res.status(400);
      throw new Error("Invalid or expired reset token");
    }
    
    // Set new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    
    // Clear reset token fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    
    await user.save();
    
    res.status(200).json({ 
      message: "Password has been reset successfully",
      success: true 
    });
  } catch (error) {
    res.status(res.statusCode === 200 ? 500 : res.statusCode);
    throw new Error(error.message || "Password reset failed");
  }
});

export {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,
  updateUserById,
  requestPasswordReset,
  resetPassword
};
