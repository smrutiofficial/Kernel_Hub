const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin.model");

const registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await Admin.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    user = new Admin({ name, email, password });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Create and return JWT token
    const payload = { user: { id: user.id } };
    jwt.sign(payload, "secretToken", { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Admin.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const payload = { user: { id: user.id } };
    jwt.sign(payload, "secretToken", { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// // Get user data
// const getUserData = async (req, res) => {
//   try {
//     // Use req.user set by auth middleware to find the user
//     const user = await User.findById(req.user.id).select("-password"); // Exclude password from the result
//     if (!user) {
//       return res.status(404).json({ msg: "User not found" });
//     }
//     res.json(user);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: "Server error while fetching user data" });
//   }
// };

const updateAdminData = async (req, res) => {
  const { name, email, password } = req.body; // Get the data from the request body
  try {
    // Find the user by ID from the token
    const user = await Admin.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Update user fields
    if (name) user.name = name;
    if (email) user.email = email;

    // If the password is being updated, hash it before saving
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save(); // Save the updated user data

    res.json({ msg: "User updated successfully", user: { name: user.name, email: user.email } }); // Do not send the password back
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error while updating user data" });
  }
};


module.exports = { registerAdmin, loginAdmin, updateAdminData };
