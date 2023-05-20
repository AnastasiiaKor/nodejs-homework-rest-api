const { User } = require("../models/user");
const { HttpError, ctrlWrapper } = require("../helpers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashedPassword });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw HttpError(401, "Email or password is wrong");
  }
  const { JWT_SECRET } = process.env;
  const payload = { id: user._id };

  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: "23h",
  });

  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
};
