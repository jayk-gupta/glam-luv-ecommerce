const { generateToken } = require("../jwt");
const User = require("../models/User");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // destination to save uploads
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

exports.uploadUserImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "no file uploaded" });
  }

  const imgUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;

  res.status(200).json({ imgUrl });
};

exports.loginUser = async (req, res) => {
  try {
    // extract username and password from body
    console.log(req.body);
    const { email, password } = req.body;
    // Find the user in the database
    const user = await User.findOne({ email: email });
    // If user does not exists or password does not match
    if (!user || !user.comparePassword(password)) {
      return res.status(401).json({
        error: "Invalid username or password",
      });
    }
    const payload = {
      id: user.id,
      email: user.email,
    };
    const token = generateToken(payload);
    //   return token
    res.json({ token });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while logging in",
      details: error.message,
    });
  }
};
exports.registerUser = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  try {
    // check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        msg: "User already exists",
      });
    }
    user = new User({ email, password });
    savedUser = await user.save();
    console.log(savedUser);

    res.status(201).json({
      message: "user registered successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "An error occurred while registering user",
      details: error.message,
    });
  }
};
