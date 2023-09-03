const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
module.exports.isLoggedIn = async (request, response, next) => {
      const token = request.headers.authorization.split(" ")[1];

      if (!token) {
            response.json({ message: "please login" });
      } else {
            try {
                  const decodedToken = await jwt.verify(token, "secret");

                  if (!decodedToken) {
                        response.json("not a valid token");
                  } else {
                        request.user = decodedToken;
                        next();
                  }
            } catch (error) {
                  response.json(error);
            }
      }
};
