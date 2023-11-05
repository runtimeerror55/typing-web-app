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
                  const userSettings = await settingsModel.findOne({
                        user: request.user._id,
                  });
                  if (userSettings) {
                        response.status(200).json({
                              status: "success",
                              payload: { settings: userSettings },
                        });
                  } else {
                        response.status(500).json({
                              status: "error",
                              message: "cound not find your settings data",
                        });
                  }
            } catch (error) {
                  response.json({ status: "error", message: error.message });
            }
      })
      .put(isLoggedIn, async (request, response) => {
            try {
                  console.log(request.body);
                  if (request.body["language and range"]) {
                        request.body["language and range"] = JSON.parse(
                              request.body["language and range"]
                        );
                  }
                  console.log(request.body);

                  await settingsModel.findOneAndUpdate(
                        { user: request.user._id },
                        request.body
                  );
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
                  const settings = await settingsModel.findOne({
                        user: request.user._id,
                  });
                  console.log(settings);
                  if (!settings) {
                        throw new Error("no user settings data");
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
