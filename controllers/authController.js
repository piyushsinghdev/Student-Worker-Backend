const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { users } = require("../utils/db");
const User = require("../models/userModel");
const SECRET_KEY = "piyush"; // In production, use environment variables
const validator = require("validator"); // npm install validator

// Helper function to validate email
const validateEmail = (email) => {
  if (!email || !validator.isEmail(email)) {
    throw new Error("Invalid email address.");
  }
};

// Helper function to validate password
const validatePassword = (password) => {
  if (!password || typeof password !== "string" || password.length < 8) {
    throw new Error("Password must be at least 8 characters long.");
  }

  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)/;
  if (!passwordRegex.test(password)) {
    throw new Error("Password must contain at least one letter and one number.");
  }
};

// Registration Controller
const register = async (req, res) => {
  try {
    const { username, password, userType } = req.body;
    console.log(req.body, 'BODY');

    // Validate email and password individually
    try {
      validateEmail(username);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }

    try {
      validatePassword(password);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }

    // Check if user already exists
    const existingUser = users.find((user) => user.username === username);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the user
    const newUser = new User(username, hashedPassword, userType);
    users.push(newUser);

    const token = jwt.sign({ username: username }, SECRET_KEY, { expiresIn: "1h" });

    res.status(201).json({ message: "User registered successfully",token,success: true ,isOnBoardingCompleted:false});
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Login Controller
const login = async (req, res) => {
  try {
    const { username: email, password } = req.body;

    // Validate email
    try {
      validateEmail(email);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }

    // Check if password is provided
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    // Find the user by email
    const user = users.find((user) => user.username === email);
    console.log({user})
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: "1h" });

    userProfile = {
      id: user?.id || "",
      personalDetail: user?.personalDetail || "",
      email: user.username || "",
      educationalDetail : user?.educationDetail || "",
      skills: user?.skillDetail || "",
      role: user?.userType || "",
      isOnBoardingCompleted: user.isOnBoardingCompleted,
    }
    res.status(200).json({ message: "Login successful", token,userProfile });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Protected route (profile)
const profile = (req, res) => {
  const user = req.user;  // Retrieved from the JWT middleware
  res.status(200).json({ message: `Welcome ${user.username}!` });
};

const completeOnBoarding = (req,res) =>{
  const email = req.email;
  console.log(email)
  const { personalDetail,education,skills,isOnBoardingCompleted } = req.body; 
  const userIndex = users.findIndex((user) => user.username === email);

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }
  if (personalDetail) users[userIndex].personalDetail = personalDetail;
  if (education) users[userIndex].education = education;
  if (skills) users[userIndex].skills = skills;
  if (isOnBoardingCompleted) users[userIndex].isOnBoardingCompleted = isOnBoardingCompleted

  const user = users[userIndex]
  userProfile = {
    id: user?.id || "",
    personalDetail: user?.personalDetail || "",
    email: user.username || "",
    educationalDetail : user?.educationDetail || "",
    skills: user?.skillDetail || "",
    role: user?.userType || "",
    isOnBoardingCompleted: user.isOnBoardingCompleted,
  }

  // Respond with the updated user info
  res.status(200).json({
    message: "Profile updated successfully",
    userProfile,
  });
}

module.exports = { register, login, profile ,completeOnBoarding};
