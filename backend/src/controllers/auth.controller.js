import { query } from "../database/database.js";
import { helper } from "../_util/helper.js";
import jwt from "jsonwebtoken";
import { authRedis } from "../database/redis_connect.js";

const config = process.env;
const getUser = async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;
    const rows = await query("call spUser(?,?,?,?,?,?)", [
      5,
      0,
      0,
      email,
      password,
      "X",
    ]);
    let user = helper.emptyOrRows(rows);
    user = user[0][0];
    if (user) {
      const token = jwt.sign(
        { user_id: user.IdUser, email, user_type: user.UserType },
        config.TOKEN_KEY,
        {
          expiresIn: config.jwtExpiration,
        }
      );
      const refreshtoken = GenerateRefreshToken(user.IdUser);
      user.token = token;
      user.refreshtoken = refreshtoken;
      user.msg = "ok";
      res.status(200).json(user);
      console.log(config.jwtExpiration);
    } else {
      res.status(400).json({ msg: "Invalid Credentials" });
    }
    // user
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const addUser = async (req, res) => {};

const GenerateRefreshToken = async (IdUser) => {
  try {
    let refreshtoken = jwt.sign({ user_id: IdUser }, config.TOKEN_KEY_REFRESH, {
      expiresIn: config.jwtRefreshExpiration,
    });
    console.log(authRedis);

    const value = await authRedis.get("key");
    await authRedis.set(
      IdUser.toString(),
      JSON.stringify({ token: refreshtoken })
    );
  } catch (err) {
    console.log(err);
    return err;
  }

  return refreshtoken;
};

export const authController = {
  getUser,
  addUser,
};
