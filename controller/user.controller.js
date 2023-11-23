const models = require("../models");
const { user } = models;
const { token } = models;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { Op } = require("sequelize");
const HTML_TEMPLATE = require("../utils/mail-template");
const SENDMAIL = require("../utils/mailer");
require("dotenv").config();

exports.signup = (req, res) => {
  user
    .create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    })
    .then((user) => {
      if (user) {
        const message = `Hi ${user.username}, Welcome to our E-commerce`;
        const options = {
          from: process.env.MAILER_EMAIL,
          to: user.email,
          subject: "Welcome Email",
          text: message,
          html: HTML_TEMPLATE(message),
        };
        SENDMAIL(options, (info) => {
          console.log("Email sent successfully");
          console.log("MESSAGE ID: ", info.messageId);
        });
        return res.status(201).send(user);
      } else {
        return res.status(409).send("Details are not correct");
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  const { email, username, password } = req.body;

  if ((!email && !username) || !password) {
    return res
      .status(400)
      .send({ message: "Email/Username and password are required." });
  }

  let whereCondition = {};

  if (email) {
    whereCondition.email = email;
  }

  if (username) {
    whereCondition.username = username;
  }

  user
    .findOne({
      where: {
        [Op.or]: [whereCondition],
      },
    })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(password, user.password);

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 86400, // 24 hours
      });

      res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
      console.log("user", JSON.stringify(user, null, 2));
      console.log(token);

      res.status(200).send({
        id: user.user_id,
        username: user.username,
        email: user.email,
        accessToken: token,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).send({ message: "Email is required." });
    }
    const User = await user.findOne({ where: { email } });

    if (!User) {
      return res.status(404).send("User not found.");
    }

    let Token = jwt.sign({ id: User.id }, process.env.JWT_SECRET, {
      expiresIn: 1 * 24 * 60 * 60 * 1000,
    });

    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 1); // Set expiration for 1 hour from now
   
    await token.create({
      userId: User.id,
      token: Token,
      expirationDate,
    });

    const link = `${process.env.BASE_FRONTEND_URL}/password-reset/${User.id}/${Token}`;
    const message = `Hi ${User.username}, click the link to reset your password ${link} `;
    const options = {
      from: process.env.MAILER_EMAIL,
      to: email,
      subject: "Reset Password Email",
      text: message,
      html: HTML_TEMPLATE(message),
    };
    SENDMAIL(options, (info) => {
      console.log("Email sent successfully");
      console.log("MESSAGE ID: ", info.messageId);
    });

    res.send("Password reset link sent to your email.");
  } catch (error) {
    res.send("An error occured");
    console.log(error);
  }
};

exports.resetPassword = async (req, res) => {
  const { token: resetToken } = req.params;
  const { password, confirmPassword } = req.body;

  try {
    if (password !== confirmPassword) {
      return res.status(400).send("Passwords do not match.");
    }

    const passwordRegex = /^(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res
        .status(400)
        .send(
          "Password must contain at least 8 characters and an uppercase letter."
        );
    }

    const decodedToken = jwt.verify(resetToken, process.env.JWT_SECRET);
    const tokenEntry = await token.findOne({ where: { token: resetToken } });

    if (!tokenEntry || tokenEntry.expirationDate < new Date()) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    if (decodedToken.id !== tokenEntry.userId) {
      return res.status(400).json({ message: "Token does not match user ID" });
    }


    const User = await user.findByPk(decodedToken.id);
    if (!User) {
      return res.status(404).json({ message: "User not found" });
    }

    User.password = password;
    await User.save();
    await token.destroy({ where: { token: resetToken } });

    return res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res.status(500).json({ message: "Error resetting password" });
  }
};
