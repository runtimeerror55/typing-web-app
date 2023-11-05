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
            optionIndex: {
                  type: Number,
                  default: 0,
            },
      },
      user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
      },
});

const settingsModel = mongoose.model("settings", settingsSchema);

module.exports = settingsModel;
