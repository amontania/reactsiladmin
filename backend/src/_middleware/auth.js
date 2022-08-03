import jwt from "jsonwebtoken";

const config = process.env;
// const { TokenExpiredError } = jwt;
const catchError = (err, res) => {
  if (err.name === "TokenExpiredError") {
    return res
      .status(401)
      .send({ msg: "Session timed out,please login again" });
  } else if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ msg: "Invalid token,please login again!" });
  } else {
    //catch other unprecedented errors
    console.error(err);
    return res.status(400).json({ err });
  }

  // return res.sendStatus(401).send({ msg: "Unauthorized!" });
};

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  console.log(token);
  if (!token || typeof token === "undefined") {
    return res
      .status(403)
      .send({ msg: "A token is required for authentication" });
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
    console.log(decoded);
  } catch (err) {
    return catchError(err, res);
    // return res.status(401).json({ msg: "Invalid Token" });
  }
  return next();
};
export default verifyToken;
