const mongoose = require("mongoose");

const settingsSchema = mongoose.Schema({
      timer: {
            type: Number,
            default: 15,
      },
      theme: {
            type: String,
            default: "green-theme",
      },
      sound: {
            type: String,
            default: "confettiEdited",
      },
      user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
      },
});

const settingsModel = mongoose.model("settings", settingsSchema);

module.exports = settingsModel;
