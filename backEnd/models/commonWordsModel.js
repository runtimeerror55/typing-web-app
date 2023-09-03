const mongoose = require("mongoose");

const commonWordsSchema = mongoose.Schema({
      words: [
            {
                  type: String,
            },
      ],
});

const commonWordsModel = mongoose.model("commonWords", commonWordsSchema);

module.exports = commonWordsModel;
