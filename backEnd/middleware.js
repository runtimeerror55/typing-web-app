const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
module.exports.isLoggedIn = async (request, response, next) => {
      try {
            const token = request.headers.authorization.split(" ")[1];

            if (!token) {
                  response.json({ message: "please login" });
            } else {
                  const decodedToken = jwt.verify(token, "secret");

                  if (!decodedToken) {
                        response.json("not a valid token");
                  } else {
                        request.user = decodedToken;
                        next();
                  }
            }
      } catch (error) {
            response
                  .status(500)
                  .json({ status: "error", message: error.message });
      }
};
