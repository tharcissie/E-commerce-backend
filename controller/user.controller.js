const models = require("../models");
const { user } = models;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { Op } = require("sequelize");
const verifySignUp = require("../middleware/verifySignUp");
const HTML_TEMPLATE = require("../utils/mail-template");
const SENDMAIL = require("../utils/mailer");
require("dotenv").config();

exports.signup = (req, res) => {
  verifySignUp.checkDuplicateUsernameOrEmail(req, res, () => {
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
          let token = jwt.sign({ id: user.id }, process.env.secretKey, {
            expiresIn: 1 * 24 * 60 * 60 * 1000,
          });

          // Set cookie with the token generated
          res.cookie("jwt", token, {
            maxAge: 1 * 24 * 60 * 60,
            httpOnly: true,
          });
          console.log("user", JSON.stringify(user, null, 2));
          console.log(token);
          // Send user's details
          return res.status(201).send(user);
        } else {
          return res.status(409).send("Details are not correct");
        }
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
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

      var token = jwt.sign({ id: user.id }, process.env.secretKey, {
        expiresIn: 86400, // 24 hours
      });

      //if password matches wit the one in the database
      //go ahead and generate a cookie for the user
      res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
      console.log("user", JSON.stringify(user, null, 2));
      console.log(token);
      //send user data

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
