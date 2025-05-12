import asyncHandler from "../middlewares/asyncHandler.js";
import createToken from "../utils/createToken.js";
import { sendWelcomeEmail } from "../utils/emailService.js";
import User from "../models/userModel.js";
import axios from "axios";

// Handle Google authentication callback
const googleAuthCallback = asyncHandler(async (req, res) => {
  try {
    // If authentication was successful, req.user will be set by Passport
    if (!req.user) {
      return res.redirect('/login?error=Google authentication failed');
    }
    
    // Create JWT token
    createToken(res, req.user._id);
    
    // If this is a new user, send welcome email
    if (req.user.createdAt && 
        new Date().getTime() - new Date(req.user.createdAt).getTime() < 60000) {
      try {
        await sendWelcomeEmail(req.user.username, req.user.email);
      } catch (emailError) {
        console.error('Error sending welcome email:', emailError);
        // Continue even if email fails
      }
    }
    
    // Redirect to frontend with success
    res.redirect(process.env.FRONTEND_URL || 'http://localhost:5174');
  } catch (error) {
    console.error('Google auth callback error:', error);
    res.redirect('/login?error=Server error during authentication');
  }
});

// Return current user info for Google authenticated users
const getGoogleUserProfile = asyncHandler(async (req, res) => {
  // User will be available in req.user if authenticated
  if (req.user) {
    res.json({
      _id: req.user._id,
      username: req.user.username,
      email: req.user.email,
      isAdmin: req.user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error('Not authenticated');
  }
});

// Verify Google token and sign in or create user
const verifyGoogleToken = asyncHandler(async (req, res) => {
  try {
    const { token } = req.body;
    
    if (!token) {
      res.status(400);
      throw new Error('Google token is required');
    }

    // Verify the token with Google
    const googleResponse = await axios.get(
      `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`
    );

    const { email, name, sub: googleId } = googleResponse.data;

    if (!email) {
      res.status(400);
      throw new Error('Email not found in Google token');
    }

    // Check if user already exists
    let user = await User.findOne({ email });

    if (user) {
      // If user exists but was registered with email/password
      if (!user.googleId) {
        user.googleId = googleId;
        await user.save();
      }
    } else {
      // Create new user
      user = await User.create({
        username: name,
        email,
        googleId,
        isAdmin: false,
        // Set a secure random password for non-google login attempts
        password: Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8),
      });

      // Send welcome email to new users
      try {
        await sendWelcomeEmail(user.username, user.email);
      } catch (emailError) {
        console.error('Error sending welcome email:', emailError);
        // Continue even if email fails
      }
    }

    // Create JWT token
    createToken(res, user._id);

    // Return user data
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    console.error('Google token verification error:', error);
    res.status(401);
    throw new Error(error.message || 'Failed to verify Google token');
  }
});

export { googleAuthCallback, getGoogleUserProfile, verifyGoogleToken };
