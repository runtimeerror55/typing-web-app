const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const testModel = require("./models/testModel");
const testsHistoryModel = require("./models/testsHistoryModel");
const commonWordsModel = require("./models/commonWordsModel");
const { authenticationRouter } = require("./routes/authentication");
const { statsRouter } = require("./routes/stats");
const { isLoggedIn } = require("./middleware");
const { settingsRouter } = require("./routes/settings");

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

app.use("/", authenticationRouter);
app.use("/", statsRouter);
app.use("/", settingsRouter);

app.get("/", async (request, response) => {
      try {
            const commonWords = await commonWordsModel.findOne({});
            const testsHistory = await testsHistoryModel.findOne({});

            // let words = [];
            // for (let i = 0; i < 100; i++) {
            //       const randomNumber = Math.floor(Math.random() * 500);
            //       words.push(commonWords.words[randomNumber]);
            //       words.push(" ");
            // }

            setTimeout(() => {
                  response.status(200).json({
                        status: "success",
                        message: "fetched successfully",
                        payload: commonWords.words,
                        // words,
                        settings: {
                              theme: "green-theme",
                              sound: "confetti.mp3",
                              timer: "15",
                        },
                  });
            }, 1000);
      } catch (error) {
            response
                  .status(500)
                  .json({ status: "error", message: error.message });
      }
});

// app.put("/settings", isLoggedIn, async (request, response) => {
//       try {
//             console.log(request.body);

//             await testsHistoryModel.findOneAndUpdate(
//                   { user: request.user._id },
//                   request.body
//             );
//             response.status(200).json({
//                   status: "success",
//                   message: "successfully updated settings",
//             });
//       } catch (error) {
//             response.status(500).json({
//                   status: "error",
//                   message: "could not update settings",
//             });
//       }
// });
app.listen(8080, () => {
      console.log("listening on 8080 port");
});
