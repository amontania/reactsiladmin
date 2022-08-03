import { config } from "dotenv";

config();

export default {
  db: {
    host: process.env.HOST,
    database: process.env.DB,
    user: process.env.USER,
    password: process.env.PASSWORD,
  },
  listPerPage: 10,
  jwtExpiration: process.env.jwtExpiration, // 2 hour
  jwtRefreshExpiration: process.env.jwtRefreshExpiration, // 24 hours
};
