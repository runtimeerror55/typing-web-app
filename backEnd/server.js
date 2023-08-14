const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const testModel = require("./models/testModel");
const testsHistoryModel = require("./models/testsHistoryModel");
const commonWordsModel = require("./models/commonWordsModel");
app.use(
      cors({
            origin: "*",
      })
);
mongoose
      .connect("mongodb://127.0.0.1:27017/typing")
      .then(() => {
            console.log("connected to mongodb");
      })
      .catch((e) => {
            console.log(e);
      });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (request, response) => {
      const commonWords = await commonWordsModel.findOne({});

      let words = [];
      for (let i = 0; i < 100; i++) {
            const randomNumber = Math.floor(Math.random() * 980);
            words.push(commonWords.words[randomNumber]);
            words.push(" ");
      }

      response.json(words);
});

app.post("/stats", async (request, response) => {
      const testStats = request.body;

      const newTest = new testModel(testStats);

      const testsHistory = await testsHistoryModel.findOne({});

      if (testsHistory === null) {
            const newTestsHistory = new testsHistoryModel({
                  tests: [newTest],
                  totalNumberOfTests: 1,
                  averageAccuracy: testStats.accuracy,
                  averageWpm: testStats.wpm,
                  totalNumberOfRightHits: testStats.totalNumberOfRightHits,
                  totalNumberOfWrongHits: testStats.totalNumberOfWrongHits,
                  charactersStats: testStats.charactersStats,
            });

            for (let [key, value] of Object.entries(
                  testStats.charactersStats
            )) {
                  console.log(newTestsHistory.charactersStats[key], key);

                  newTestsHistory.charactersStats[key].averageAccuracy =
                        (newTestsHistory.charactersStats[key]
                              .totalNumberOfRightHits /
                              (newTestsHistory.charactersStats[key]
                                    .totalNumberOfWrongHits +
                                    newTestsHistory.charactersStats[key]
                                          .totalNumberOfRightHits)) *
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
                  (testsHistory.averageWpm * testsHistory.totalNumberOfTests +
                        testStats.wpm) /
                  (testsHistory.totalNumberOfTests + 1);

            testsHistory.totalNumberOfRightHits +=
                  testStats.totalNumberOfRightHits;
            testsHistory.totalNumberOfWrongHits +=
                  testStats.totalNumberOfWrongHits;

            for (let [key, value] of Object.entries(
                  testStats.charactersStats
            )) {
                  if (testsHistory.charactersStats[key] !== undefined) {
                        if (
                              testsHistory.charactersStats[key]
                                    .totalNumberOfRightHits === undefined
                        ) {
                              testsHistory.charactersStats[key] = value;
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
                                    (testsHistory.charactersStats[key]
                                          .totalNumberOfRightHits /
                                          (testsHistory.charactersStats[key]
                                                .totalNumberOfWrongHits +
                                                testsHistory.charactersStats[
                                                      key
                                                ].totalNumberOfRightHits)) *
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
      response.send("hello");
});

app.get("/stats", async (request, respone) => {
      const testsHistory = await testsHistoryModel
            .findOne({}, { tests: { $slice: 7 } })
            .populate("tests");

      if (testsHistory === null) {
            respone.json([]);
      } else {
            respone.json(testsHistory);
      }
});
app.listen(8080, () => {
      console.log("listening on 8080 port");
});
