const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware");
const testsHistoryModel = require("../models/testsHistoryModel");
const settingsModel = require("../models/settingsModel");

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

                  await settingsModel.findOneAndUpdate(
                        { user: request.user._id },
                        request.body.settings
                  );
                  response.status(200).json({
                        status: "success",
                        message: "successfully updated settings",
                  });
            } catch (error) {
                  response.status(500).json({
                        status: "error",
                        message: "could not update settings",
                  });
            }
      });

module.exports.settingsRouter = router;
