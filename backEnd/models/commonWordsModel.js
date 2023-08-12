const mongoose = require("mongoose");

const commonWordsSchema = mongoose.Schema({
      words: [
            {
                  type: String,
            },
      ],
});

commonWordsModel = mongoose.model("commonWords", commonWordsSchema);

module.exports = commonWordsModel;
