const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/userModel");
const settingsModel = require("../models/settingsModel");

router.route("/login").post(async (request, response) => {
      try {
            const { name, password } = request.body;

            const user = await UserModel.findOne({ name });
            if (!user) {
                  console.log("name does not exist");
                  response.status(404).json({ message: "name does not exist" });
            } else {
                  const match = await bcrypt.compare(password, user.password);
                  if (match) {
                        console.log("succefully logged in");
                        const token = jwt.sign(
                              {
                                    _id: user._id,
                                    name: user.name,
                                    email: user.email,
                              },
                              "secret",
                              {
                                    expiresIn: 60 * 60 * 5,
                              }
                        );

                        const decodedToken = jwt.verify(token, "secret");
                        console.log(decodedToken);

                        response.status(200).json({
                              status: "success",
                              message: "successfully logged in",
                              payload: {
                                    token,
                                    user: {
                                          name: user.name,
                                    },
                                    expiresAt: decodedToken.exp,
                              },
                        });
                  } else {
                        console.log("password does not match");
                        response
                              .status(500)
                              .json({ message: "incorrect password" });
                  }
            }
      } catch (error) {
            response
                  .status(500)
                  .json({ status: "error", message: error.message });
      }
});

router.route("/register")
      .get(async (request, response) => {
            response.json("yes");
      })
      .post(async (request, response) => {
            try {
                  const { name, password, email } = request.body;

                  const isNamePresent = await UserModel.findOne({
                        name,
                  });
                  if (isNamePresent) {
                        console.log("isNamePresent");
                        response.status(500).json({
                              status: "error",
                              message: "username already exists",
                        });
                        return;
                  }

                  const isEmailPresent = await UserModel.findOne({ email });
                  if (isEmailPresent) {
                        console.log("email already exists");
                        response.status(500).json({
                              status: "error",
                              message: "email already exists",
                        });
                        return;
                  }

                  const hash = await bcrypt.hash(password, 10);

                  const newUser = new UserModel({
                        name,
                        password: hash,
                        email,
                  });
                  await newUser.save();
                  const token = jwt.sign(
                        {
                              _id: newUser._id,
                              name: newUser.name,
                              email: newUser.email,
                        },
                        "secret",
                        {
                              expiresIn: 60 * 60 * 5,
                        }
                  );
                  response.status(200).json({
                        status: "success",
                        message: "succesfully registered",
                        payload: {
                              token,
                              user: {
                                    name: newUser.name,
                              },
                        },
                  });
            } catch (error) {
                  response
                        .status(500)
                        .json({ status: "error", message: error.message });
            }
      });

module.exports.authenticationRouter = router;
