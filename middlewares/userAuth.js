const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// const jwt_token = process.env.SECRET_KEY 

var jwt_token = process.env.jwt_token|| "8uy9wy749uh3874y637567209205437389-q1";
function authenticateToken(req, res, next) {
  const token = req.header("Authorization");
  console.log(token,"this is token from user request");
  if (!token) {
    console.error("No token provided>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
     res.status(401).json({ message: "Please login/register to continue" });
  }else{
    jwt.verify(token.split(" ")[1], jwt_token, (err, user) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          console.error("Token expired");
           res.status(401).json({ message: "Token expired. Please login again" });
        } else {
          console.error("Token verification failed:", err);
           res.status(403).json({ message: "Please login to continue" });
        }
      }else{
        console.log("Decoded user:", user);
        req.user = user;
        next();
      }
  

    });
  }

  
}



module.exports = { authenticateToken };