const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerSchema, loginSchema } = require("../validators/auth-validator");
const prisma = require("../models/prisma");

exports.register = async (req, res, next) => {
  try {
    const { value, error } = registerSchema.validate(req.body);

    if (error) {
      error.statusCode = 400;
      return next(error);
    }

    value.password = await bcrypt.hash(value.password, 12);
    value.email = value.email ? value.email : undefined;
    value.mobile = value.mobile ? value.mobile : undefined;

    const user = await prisma.user.create({
      data: value,
    });

    const payload = { userId: user.id };
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY || "qwertyuiopasdfghjklzxcvbnm",
      {
        expiresIn: process.env.JWT_EXPIRE,
      }
    );
    delete user.password;
    res.status(201).json({ accessToken, user });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { value, error } = loginSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    console.log(value);
    const user = await prisma.user.findUnique({
      where: {
        username: value.username,
      },
    });

    if (!user) {
      res.status(400).json({ message: "invalid credential" });
    }

    const isMatch = await bcrypt.compare(value.password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "invalid credential" });
    }

    const payload = { userId: user.id };
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY || "qwertyuiopasdfghjklzxcvbnm",
      { expiresIn: process.env.JWT_EXPIRE }
    );
    delete user.password;
    res.status(200).json({ accessToken, user });
  } catch (error) {
    next(error);
  }
};

exports.getMe = async (req, res) => {
  res.status(200).json({ user: req.user });
};
