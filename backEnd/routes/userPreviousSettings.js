const express = require("express");
const router = express.Router();
const wordsModel = require("../models/wordsModel");
const settingsModel = require("../models/settingsModel");
// router.route("/userWords").get(async (request, response) => {
//      try{
//         const userSettings = await settingsModel.find({
//             user: request.user._id
//         })

//      }
// });

// module.exports.wordsRouter = router;
