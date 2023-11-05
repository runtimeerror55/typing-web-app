const express = require("express");
const router = express.Router();
const wordsModel = require("../models/wordsModel");
router.route("/words").get(async (request, response) => {
      try {
            let { language, optionIndex } = request.query;

            if (!language && !optionIndex) {
                  language = "english";
                  optionIndex = 0;
            }
            optionIndex = +optionIndex;

            const document = await wordsModel.findOne({
                  language,
            });

            if (document) {
                  const option = document.options[optionIndex];

                  if (
                        !option ||
                        optionIndex + 1 > document.options.length ||
                        optionIndex < 0
                  ) {
                        throw new Error("cannot get words, wrong option index");
                  }

                  const words = [];
                  option.wordsSlices.forEach((slice) => {
                        for (let i = slice[0]; i <= slice[1]; i++) {
                              words.push(document.words[i]);
                        }
                  });
                  response.status(200).json({
                        status: "success",
                        payload: words,
                  });
            } else {
                  throw new Error("laguage document does not exist");
            }
      } catch (error) {
            response
                  .status(500)
                  .json({ status: "error", message: error.message });
      }
});

module.exports.wordsRouter = router;
