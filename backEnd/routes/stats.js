const express = require("express");
const router = express.Router();
const testModel = require("../models/testModel");
const testsHistoryModel = require("../models/testsHistoryModel");
const statsModel = require("../models/statsModel");
const commonWordsModel = require("../models/commonWordsModel");
const wordsModel = require("../models/wordsModel");
const { isLoggedIn } = require("../middleware");

router.route("/stats")
      .get(isLoggedIn, async (request, response) => {
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
                              wordsStats: {},
                        });

                        for (let [key, value] of Object.entries(
                              testStats.charactersStats
                        )) {
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

                        newTestsHistory.wordsStats = {};
                        newTestsHistory.markModified("wordsStats");
                        for (let [key, value] of Object.entries(
                              testStats.wordsStats
                        )) {
                              if (value.endedAt !== undefined) {
                                    newTestsHistory.wordsStats[key] = {
                                          count: 1,
                                          wpm:
                                                (key.length / 5) *
                                                (60 / (value.speed / 1000)),
                                          rightHitsCount: value.rightHitsCount,
                                          wrongHitsCount: value.wrongHitsCount,
                                    };
                              }
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
                              }
                        }

                        let x = testsHistory.wordsStats;
                        let y = testStats.wordsStats;

                        for (let [key, value] of Object.entries(
                              testStats.wordsStats
                        )) {
                              if (value.endedAt !== undefined) {
                                    value.speed =
                                          (key.length / 5) *
                                          (60 / (value.speed / 1000));

                                    if (x[key] === undefined) {
                                          x[key] = {
                                                count: 1,
                                                wpm: value.speed,
                                                wrongHitsCount:
                                                      value.wrongHitsCount,
                                                rightHitsCount:
                                                      value.rightHitsCount,
                                          };
                                    } else {
                                          x[key].wpm =
                                                (x[key].wpm * x[key].count +
                                                      value.speed *
                                                            value.count) /
                                                (x[key].count + value.count);

                                          x[key].count++;
                                          x[key].wrongHitsCount +=
                                                value.wrongHitsCount;
                                          x[key].rightHitsCount +=
                                                value.rightHitsCount;
                                    }
                              }
                        }
                        testsHistory.totalNumberOfTests++;
                        testsHistory.tests.push(newTest);
                        testsHistory.markModified("wordsStats");
                        await newTest.save();
                        await testsHistory.save();
                  }

                  setTimeout(() => {
                        response.status(200).json({
                              status: "success",
                              message: "successfully saved to cloud",
                        });
                  }, 0);
            } catch (error) {
                  response.status(500).json({
                        status: "error",
                        message: error.message,
                  });
            }
      });

router.route("/userStats")
      .get(isLoggedIn, async (request, response) => {
            try {
                  const userStats = await statsModel.findOne({
                        user: request.user._id,
                        language: request.query.language || "english",
                        optionIndex: request.query.optionIndex || 0,
                  });

                  if (userStats === null) {
                        response.status(500).json({
                              status: "error",
                              message: "user data does not exist",
                        });
                  } else {
                        setTimeout(() => {
                              response.status(200).json({
                                    status: "success",
                                    payload: userStats,
                              });
                        }, 500);
                  }
            } catch (error) {
                  response.status(500).json({
                        status: "error",
                        message: error.message,
                  });
            }
      })
      .post(isLoggedIn, async (request, response) => {
            try {
                  const testStats = request.body;

                  let userStats = await statsModel.findOne({
                        user: request.user._id,
                        language: testStats.languageAndRange.language,
                        optionIndex: testStats.languageAndRange.optionIndex,
                  });

                  if (!userStats) {
                        const document = await wordsModel.findOne({
                              language: testStats.languageAndRange.language,
                        });

                        userStats = new statsModel({
                              user: request.user._id,
                              language: testStats.languageAndRange.language,
                              optionIndex:
                                    testStats.languageAndRange.optionIndex,
                              subName: document.options[
                                    testStats.languageAndRange.optionIndex
                              ].name,
                        });
                        await userStats.save();
                  }

                  if (testStats.mode === "test") {
                        let x = userStats.testMode;

                        const remainder = testStats.wpm % 10;
                        const quotient = testStats.wpm - remainder;
                        let startingPoint;
                        let endingPoint;
                        let range;
                        if (testStats.wpm <= 10) {
                              startingPoint = 0;
                        } else if (remainder === 0) {
                              startingPoint = quotient - 10 + 1;
                              endingPoint = quotient;
                              range = `${startingPoint}-${endingPoint}`;
                        } else {
                              startingPoint = quotient + 1;
                              endingPoint = quotient + 10;
                              range = `${startingPoint}-${endingPoint}`;
                        }

                        if (!x.speedDistribution[startingPoint]) {
                              x.speedDistribution[startingPoint] = 1;
                        } else {
                              x.speedDistribution[startingPoint]++;
                        }

                        if (!x.firstTest) {
                              x.firstTest = testStats.date;
                        }
                        x.lastTest = testStats.date;
                        x.totalTimeSpentsInTests += testStats.timer;

                        x.averageAccuracy =
                              (x.averageAccuracy *
                                    x.totalNumberOfFinishedTests +
                                    testStats.accuracy) /
                              (x.totalNumberOfFinishedTests + 1);

                        x.averageWpm =
                              (x.averageWpm * x.totalNumberOfFinishedTests +
                                    testStats.wpm) /
                              (x.totalNumberOfFinishedTests + 1);

                        x.totalNumberOfRightHits +=
                              testStats.totalNumberOfRightHits;

                        x.totalNumberOfWrongHits +=
                              testStats.totalNumberOfWrongHits;

                        x.totalNumberOfFinishedTests++;

                        if (x.highestWpmOfATest < testStats.wpm) {
                              x.highestWpmOfATest = testStats.wpm;
                        }

                        if (x.highestAccuracyOfATest < testStats.accuracy) {
                              x.highestAccuracyOfATest = testStats.accuracy;
                        }

                        if (x.lastTwentyTests.length === 20) {
                              x.lastTwentyTests.shift();
                              x.lastTwentyTests.push({
                                    wpm: testStats.wpm,
                                    accuracy: testStats.accuracy,
                                    date: testStats.date,
                                    timer: testStats.timer,
                              });
                        } else {
                              x.lastTwentyTests.push({
                                    wpm: testStats.wpm,
                                    accuracy: testStats.accuracy,
                                    date: testStats.date,
                                    timer: testStats.timer,
                              });
                        }

                        let y = userStats.testMode.wordsStats;
                        for (let [key, value] of Object.entries(
                              testStats.wordsStats
                        )) {
                              if (value.endedAt !== undefined) {
                                    if (y[key] === undefined) {
                                          y[key] = {
                                                totalNumberOfTestsAppeared:
                                                      value.count,
                                                averageWpm: value.wpm,
                                                averageAccuracy: value.accuracy,
                                                lastTwentyTests: [
                                                      {
                                                            wpm: value.wpm,
                                                            accuracy: value.accuracy,
                                                      },
                                                ],
                                          };
                                    } else {
                                          y[key].averageWpm =
                                                (y[key].averageWpm *
                                                      y[key]
                                                            .totalNumberOfTestsAppeared +
                                                      value.wpm) /
                                                (y[key]
                                                      .totalNumberOfTestsAppeared +
                                                      1);

                                          y[key].averageAccuracy =
                                                (y[key].averageAccuracy *
                                                      y[key]
                                                            .totalNumberOfTestsAppeared +
                                                      value.accuracy) /
                                                (y[key]
                                                      .totalNumberOfTestsAppeared +
                                                      1);

                                          y[key].totalNumberOfTestsAppeared +=
                                                value.count;

                                          if (
                                                y[key].lastTwentyTests
                                                      .length === 20
                                          ) {
                                                y[key].lastTwentyTests.shift();
                                                y[key].lastTwentyTests.push({
                                                      wpm: value.wpm,
                                                      accuracy: value.accuracy,
                                                });
                                          } else {
                                                y[key].lastTwentyTests.push({
                                                      wpm: value.wpm,
                                                      accuracy: value.accuracy,
                                                });
                                          }
                                    }
                              }
                        }
                        userStats.markModified("testMode.wordsStats");
                        userStats.markModified("testMode.speedDistribution");
                        await userStats.save();
                  } else if (testStats.mode === "practise") {
                        let y = userStats.practiseMode.wordsStats;

                        for (let [key, value] of Object.entries(
                              testStats.wordsStats
                        )) {
                              if (value.endedAt !== undefined) {
                                    if (y[key] === undefined) {
                                          y[key] = {
                                                totalNumberOfTestsAppeared: 1,
                                                averageWpm: value.wpm,
                                                averageAccuracy: value.accuracy,
                                                lastTwentyTests: [
                                                      {
                                                            wpm: value.wpm,
                                                            accuracy: value.accuracy,
                                                      },
                                                ],
                                          };
                                    } else {
                                          y[key].averageWpm =
                                                (y[key].averageWpm *
                                                      y[key]
                                                            .totalNumberOfTestsAppeared +
                                                      value.wpm) /
                                                (y[key]
                                                      .totalNumberOfTestsAppeared +
                                                      1);

                                          y[key].averageAccuracy =
                                                (y[key].averageAccuracy *
                                                      y[key]
                                                            .totalNumberOfTestsAppeared +
                                                      value.accuracy) /
                                                (y[key]
                                                      .totalNumberOfTestsAppeared +
                                                      1);

                                          y[key].totalNumberOfTestsAppeared++;

                                          if (
                                                y[key].lastTwentyTests
                                                      .length === 3
                                          ) {
                                                y[key].lastTwentyTests.shift();
                                                y[key].lastTwentyTests.push({
                                                      wpm: value.wpm,
                                                      accuracy: value.accuracy,
                                                });
                                          } else {
                                                y[key].lastTwentyTests.push({
                                                      wpm: value.wpm,
                                                      accuracy: value.accuracy,
                                                });
                                          }
                                    }
                              }
                        }
                        userStats.markModified("practiseMode.wordsStats");
                        await userStats.save();
                  }
                  response.status(200).json({
                        status: "success",
                        message: "saved succesfully",
                  });
            } catch (error) {
                  response.status(500).json({
                        status: "error",
                        message: error.message,
                  });
            }
      });

router.route("/userStatsOne").get(isLoggedIn, async (request, response) => {
      try {
            const userStats = await statsModel.find({
                  user: request.user._id,
                  language: request.query.language || "english",
            });

            const languageInformation = await wordsModel.findOne({
                  language: request.query.language || "english",
            });

            if (!languageInformation) {
                  response.status(500).json({
                        status: "error",
                        message: "language does not exist",
                  });
            } else {
                  let newArray = [];
                  if (languageInformation.options.length > userStats.length) {
                        for (
                              let i = 0;
                              i < languageInformation.options.length;
                              i++
                        ) {
                              let found = false;
                              for (let j = 0; j < userStats.length; j++) {
                                    if (i === userStats[j]?.optionIndex) {
                                          found = true;
                                    }
                              }
                              if (!found) {
                                    newArray.push({
                                          subName: languageInformation.options[
                                                i
                                          ].name,
                                          optionIndex: i,
                                    });
                              }
                        }
                  }

                  setTimeout(() => {
                        response.status(200).json({
                              status: "success",
                              payload: [...userStats, ...newArray],
                        });
                  }, 500);
            }
      } catch (error) {
            response.status(500).json({
                  status: "error",
                  message: error.message,
            });
      }
});
module.exports.statsRouter = router;
