const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware");
const testsHistoryModel = require("../models/testsHistoryModel");
const settingsModel = require("../models/settingsModel");
const wordsModel = require("../models/wordsModel");
const statsModel = require("../models/statsModel");

router.route("/settings")
      .get(isLoggedIn, async (request, response) => {
            try {
                  let userSettings = await settingsModel.findOne({
                        user: request.user._id,
                  });

                  if (!userSettings) {
                        console.log("hello");
                        userSettings = {
                              timer: 15,

                              theme: "blue-theme",
                              sound: "soundA",
                              "language and range": {
                                    language: "english",
                                    fullName: "english (1-100)",
                                    optionIndex: 0,
                              },
                              mode: "test",
                              modeOne: "words",
                              modeThree: 500,
                              modeTwo: "0",
                        };
                  }

                  response.status(200).json({
                        status: "success",
                        payload: userSettings,
                  });
            } catch (error) {
                  response
                        .status(500)
                        .json({ status: "error", message: error.message });
            }
      })
      .put(isLoggedIn, async (request, response) => {
            try {
                  if (request.body["language and range"]) {
                        request.body["language and range"] = JSON.parse(
                              request.body["language and range"]
                        );
                  }
                  let userSettings = await settingsModel.findOne({
                        user: request.user._id,
                  });
                  if (!userSettings) {
                        userSettings = new settingsModel({
                              user: request.user._id,
                              ...request.body,
                        });
                        await userSettings.save();
                  } else {
                        for (let [key, value] of Object.entries(request.body)) {
                              userSettings[key] = value;
                        }
                        await userSettings.save();
                  }
                  response.status(200).json({
                        status: "success",
                        message: "successfully updated settings",
                  });
            } catch (error) {
                  response.status(500).json({
                        status: "error",
                        message: error.message,
                  });
            }
      });

router.route("/previousSessionSettings").get(
      isLoggedIn,
      async (request, response) => {
            try {
                  let settings = await settingsModel.findOne({
                        user: request.user._id,
                  });

                  if (!settings) {
                        settings = {
                              timer: 15,

                              theme: "blue-theme",
                              sound: "soundA",
                              "language and range": {
                                    language: "english",
                                    fullName: "english (1-100)",
                                    optionIndex: 0,
                              },
                              mode: "test",
                              modeOne: "words",
                              modeThree: 500,
                              modeTwo: "0",
                        };
                  }
                  const languageDocument = await wordsModel.findOne({
                        language: settings["language and range"].language,
                  });

                  if (!languageDocument) {
                        throw new Error("no words data");
                  }
                  const optionIndex =
                        settings["language and range"].optionIndex;
                  const option = languageDocument.options[optionIndex];

                  if (
                        !option ||
                        optionIndex + 1 > languageDocument.options.length ||
                        optionIndex < 0
                  ) {
                        throw new Error("cannot get words, wrong option index");
                  }

                  const words = [];
                  option.wordsSlices.forEach((slice) => {
                        for (let i = slice[0]; i <= slice[1]; i++) {
                              words.push(languageDocument.words[i]);
                        }
                  });

                  const stats = await statsModel.findOne({
                        user: request.user._id,
                        language: settings["language and range"].language,
                        optionIndex: settings["language and range"].optionIndex,
                  });

                  response.status(200).json({
                        status: "success",
                        payload: {
                              settings,
                              words,
                              stats: stats || {},
                        },
                  });
            } catch (error) {
                  response
                        .status(500)
                        .json({ status: "error", message: error.message });
            }
      }
);

module.exports.settingsRouter = router;
