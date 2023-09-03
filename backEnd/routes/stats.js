const express = require("express");
const router = express.Router();
const testModel = require("../models/testModel");
const testsHistoryModel = require("../models/testsHistoryModel");
const commonWordsModel = require("../models/commonWordsModel");
const { isLoggedIn } = require("../middleware");

router.route("/stats")
      .get(isLoggedIn, async (request, response) => {
            console.log(request.user);
            const testsHistory = await testsHistoryModel
                  .findOne({ user: request.user._id }, { tests: { $slice: 7 } })
                  .populate("tests");

            if (testsHistory === null) {
                  response.status(500).json({
                        status: "error",
                        message: "user data does not exist",
                  });
            } else {
                  setTimeout(() => {
                        response.status(200).json(testsHistory);
                  }, 1000);
            }
      })
      .post(isLoggedIn, async (request, response) => {
            try {
                  console.log("saveing the data bro");
                  const testStats = request.body;

                  const newTest = new testModel(testStats);

                  const testsHistory = await testsHistoryModel.findOne({
                        user: request.user._id,
                  });

                  if (testsHistory === null) {
                        const newTestsHistory = new testsHistoryModel({
                              user: request.user._id,
                              tests: [newTest],
                              totalNumberOfTests: 1,
                              averageAccuracy: testStats.accuracy,
                              averageWpm: testStats.wpm,
                              totalNumberOfRightHits:
                                    testStats.totalNumberOfRightHits,
                              totalNumberOfWrongHits:
                                    testStats.totalNumberOfWrongHits,
                              charactersStats: testStats.charactersStats,
                        });

                        for (let [key, value] of Object.entries(
                              testStats.charactersStats
                        )) {
                              // console.log(newTestsHistory.charactersStats[key], key);

                              newTestsHistory.charactersStats[
                                    key
                              ].averageAccuracy =
                                    (newTestsHistory.charactersStats[key]
                                          .totalNumberOfRightHits /
                                          (newTestsHistory.charactersStats[key]
                                                .totalNumberOfWrongHits +
                                                newTestsHistory.charactersStats[
                                                      key
                                                ].totalNumberOfRightHits)) *
                                    100;
                        }
                        await newTest.save();
                        await newTestsHistory.save();
                  } else {
                        testsHistory.averageAccuracy =
                              (testsHistory.averageAccuracy *
                                    testsHistory.totalNumberOfTests +
                                    testStats.accuracy) /
                              (testsHistory.totalNumberOfTests + 1);

                        testsHistory.averageWpm =
                              (testsHistory.averageWpm *
                                    testsHistory.totalNumberOfTests +
                                    testStats.wpm) /
                              (testsHistory.totalNumberOfTests + 1);

                        testsHistory.totalNumberOfRightHits +=
                              testStats.totalNumberOfRightHits;
                        testsHistory.totalNumberOfWrongHits +=
                              testStats.totalNumberOfWrongHits;

                        for (let [key, value] of Object.entries(
                              testStats.charactersStats
                        )) {
                              if (
                                    testsHistory.charactersStats[key] !==
                                    undefined
                              ) {
                                    if (
                                          testsHistory.charactersStats[key]
                                                .totalNumberOfRightHits ===
                                          undefined
                                    ) {
                                          testsHistory.charactersStats[key] =
                                                value;
                                          testsHistory.charactersStats[
                                                key
                                          ].averageAccuracy =
                                                (value.totalNumberOfRightHits /
                                                      (value.totalNumberOfRightHits +
                                                            value.totalNumberOfWrongHits)) *
                                                100;
                                    } else {
                                          testsHistory.charactersStats[
                                                key
                                          ].totalNumberOfRightHits +=
                                                value.totalNumberOfRightHits;
                                          testsHistory.charactersStats[
                                                key
                                          ].totalNumberOfWrongHits +=
                                                value.totalNumberOfWrongHits;

                                          testsHistory.charactersStats[
                                                key
                                          ].averageAccuracy =
                                                (testsHistory.charactersStats[
                                                      key
                                                ].totalNumberOfRightHits /
                                                      (testsHistory
                                                            .charactersStats[
                                                            key
                                                      ].totalNumberOfWrongHits +
                                                            testsHistory
                                                                  .charactersStats[
                                                                  key
                                                            ]
                                                                  .totalNumberOfRightHits)) *
                                                100;
                                    }
                              } else {
                              }
                        }
                        testsHistory.totalNumberOfTests++;
                        testsHistory.tests.push(newTest);
                        await newTest.save();
                        await testsHistory.save();
                  }

                  response.status(200).json({
                        status: "success",
                        message: "successfully saved to cloud",
                  });
            } catch (error) {
                  response.status(500).json({
                        status: "error",
                        message: "internal error could not save the data",
                  });
            }
      });

module.exports.statsRouter = router;
