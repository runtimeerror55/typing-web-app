const mongoose = require("mongoose");

const wordsSchema = mongoose.Schema({
      language: String,
      words: [
            {
                  type: String,
            },
      ],
      options: [
            {
                  name: String,
                  wordsSlices: [[Number]],
            },
      ],
});

const wordsModel = mongoose.model("words", wordsSchema);

module.exports = wordsModel;
