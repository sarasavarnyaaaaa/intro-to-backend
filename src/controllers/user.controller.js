import User from "../models/user.model.js";

// REGISTER: username, email, and password are required.
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password,
      isLoggedIn: false
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

// LOGIN: checks whether the email and password match a stored user.
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Plain-text comparison is intentionally tutorial-level only.
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    user.isLoggedIn = true;
    await user.save();

    return res.status(200).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

// LOGOUT: finds the user by email and changes their login flag.
const logoutUser = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isLoggedIn = false;
    await user.save();

    return res.status(200).json({ message: "Logout was successful" });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

export { registerUser, loginUser, logoutUser };
