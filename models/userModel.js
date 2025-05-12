import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    // Add name field to be compatible with existing database
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: function() {
        // Password is required only if googleId is not provided
        return !this.googleId;
      },
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Pre-save middleware to ensure name is set from username if not provided
userSchema.pre('save', function(next) {
  if (!this.name && this.username) {
    this.name = this.username;
  }
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
