const userModel = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userCltr = {};

userCltr.register = (req, res) => {
  const body = req.body;
  const user = new userModel(body);
  user
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
};
userCltr.login = (req, res, next) => {
  const body = req.body;
  userModel
    .findOne({ email: body.email })
    .then((user) => {
      if (user) {
        bcryptjs
          .compare(body.password, user.password)
          .then((result) => {
            if (result) {
              const tokenData = {
                id: user._id,
              };
              const token = jwt.sign(tokenData, "api-project", {
                expiresIn: "2d",
              });
              res.send({ token: token });
            }
          })
          .catch((err) => {
            res.send({ error: "invalid email/password" });
          });
      } else {
        res.send({ error: "invalid email/password" });
      }
    })
    .catch((err) => {
      res.send(err);
    });
};
userCltr.accounts = (req, res) => {
  userModel
    .find()
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.send(err);
    });
};
userCltr.showUser = (req, res) => {
  const id = req.params.id;
  userModel
    .findById(id)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.send(err);
    });
};
userCltr.update = (req, res) => {
  const id = req.params.id;
  const body = req.body;
  userModel
    .findByIdAndUpdate(id, body, { new: true, runValidators: true })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.send(err);
    });
};
userCltr.distroy = (req, res) => {
  const id = req.params.id;
  userModel
    .findByIdAndDelete(id)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.send(err);
    });
};
module.exports = userCltr;
