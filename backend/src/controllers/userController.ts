import { Request, Response } from "express";
import User from "../models/User";
import Otp from "../models/Otp";
import { generateToken } from "../jwt";
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

exports.startSignup = async (req: Request, res: Response) => {
  const { email } = req.body;
  console.log(email);
  // if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res.status(400).json({ message: "Email already registered" });

  // create new user
  const otp = generateOtp();
  console.log(otp);
  await Otp.create({ email, otp });

  // Send OTP via email (example using nodemailer)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    // this is the mail from which otp will be sent
    // pass is google app password
    auth: {
      user: process.env.EMAIL_USER!,
      pass: process.env.EMAIL_PASS!,
    },
  });

  await transporter.sendMail({
    to: email,
    subject: "Your OTP for Signup",
    html: `<h3>Your OTP is: ${otp}</h3>`,
  });

  res.json({ message: "OTP sent to email" });
};

//////////////////////////////////////////////////////
// verify OTP
exports.verifyOtp = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  const validOtp = await Otp.findOne({ email, otp });
  console.log(validOtp);
  if (!validOtp)
    return res.status(400).json({
      message: "Invalid or expired OTP",
    });

  await Otp.deleteMany({ email });

  res.json({
    message: "OTP verified successfully",
  });
};

exports.completeSignup = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser)
    return res.status(400).json({ message: "User already exists" });
  const hasedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hasedPassword });

  res.status(201).json({ message: "Signup completed", userId: user._id });
};
///////////////////////////////////////////////////////
// login
exports.login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  console.log(user);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  console.log(isMatch);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = generateToken({ userId: user._id, email: user.email });

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    secure: false,
    sameSite:"lax"
  })
    .status(200)
    .json({ message: "Login successful", user: { email: user.email } });
};
