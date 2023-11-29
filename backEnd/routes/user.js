const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware");
const { UserModel } = require("../models/userModel");
router.route("/userDetails").get(isLoggedIn, async (request, response) => {
      try {
            const user = await UserModel.findById(request.user._id);
            if (!user) {
                  throw new Error("user does not exist");
            } else {
                  response
                        .status(200)
                        .json({
                              status: "success",
                              payload: { user: user.name, email: user.email },
                        });
            }
      } catch (error) {
            response
                  .status(500)
                  .json({ status: "error", message: error.message });
      }
});

module.exports.userRouter = router;
