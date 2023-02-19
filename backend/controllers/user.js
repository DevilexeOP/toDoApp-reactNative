const { response } = require("express");
const User = require("../model/user");
const VerificationToken = require("../model/verificationToken");
const { sendError } = require("../utils/helper");
const jwt = require("jsonwebtoken");
const { generateOTP, mailTransport, emailTemplate } = require("../utils/mail");
const verificationToken = require("../model/verificationToken");
const { isValidObjectId } = require("mongoose");
const comparetoken = require("../model/verificationToken");

exports.createUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) return sendError(res, "This email already exists");
  const newUser = new User({
    email,
    password,
  });
  const OTP = generateOTP();
  const verificationToken = new VerificationToken({
    owner: newUser._id,
    token: OTP,
  });
  await verificationToken.save();
  await newUser.save();

  mailTransport().sendMail({
    from: "com.devil.todoapp@gmail.com",
    to: newUser.email,
    subject: "Verify your email account",
    html: emailTemplate(OTP),
  });

  res.send(newUser);
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email.trim() || !password.trim())
    return sendError(res, "email/password is missing");

  const user = await User.findOne({ email });
  if (!user) return sendError(res, "User not found");

  const isMatched = await user.comparePassword(password);
  if (!isMatched) return sendError(res, "Email or password mismatch");

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.json({ success: true, user: { email: user.email, id: user._id, token } });
};

exports.verifyEmail = async (req, res) => {
  const { userId, otp } = req.body;

  if (!userId || !otp.trim())
    return sendError(res, " Invalid request , missing parameters !");

  if (!isValidObjectId(userId)) return sendError(res, "Invalid user ID");

  const user = await User.findById(userId);
  if (!user) return sendError(res, " User Not Found !");

  if (user.verified) return sendError(res, "User Verified Already !");

  const token = await VerificationToken.findOne({ owner: user._id });
  if (!token) return sendError(res, "User Not Found !");

  const isMatched = await token.compareToken(otp);
  if (!isMatched) return sendError(res, "Invalid Token  !");

  user.verified = true;

  await VerificationToken.findByIdAndDelete(token._id);
  await user.save();

  mailTransport().sendMail({
    from: "com.devil.todoapp@gmail.com",
    to: user.email,
    subject: "Email Account Verified",
    html: `<h1>Verified Email Successfully</h1>`,
  });
  res.json({
    success: true,
    message: "Verified Email Successfully",
    user: { email: user.email, id: user._id },
  });
};
