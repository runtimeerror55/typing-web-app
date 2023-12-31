const mongoose = require("mongoose");

const settingsSchema = mongoose.Schema({
      timer: {
            type: Number,
            default: 15,
      },
      theme: {
            type: String,
            default: "blue-theme",
      },
      sound: {
            type: String,
            default: "soundA",
      },
      "language and range": {
            language: {
                  type: String,
                  default: "english",
            },
            fullName: {
                  type: String,
                  default: "english (1-100)",
            },
            optionIndex: {
                  type: Number,
                  default: 0,
            },
      },
      mode: {
            type: String,
            default: "test",
      },
      modeOne: {
            type: String,
            default: "words",
      },
      modeTwo: {
            type: String,
            default: "0",
      },
      modeThree: {
            type: Number,
            default: 500,
      },

      user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
      },
});

const settingsModel = mongoose.model("settings", settingsSchema);

module.exports = settingsModel;
