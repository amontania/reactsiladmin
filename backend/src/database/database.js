import mysql from "mysql2/promise";
import config from "./../config/db.js";

// const connection = await mysql.createConnection({
//   host: config.host,
//   database: config.database,
//   user: config.user,
//   password: config.password,
// });

// export const getConnection = () => {
//   return connection;
// };

// async function query(sql, params) {

// }
export const query = async (sql, params) => {
  const connection = await mysql.createConnection(config.db);
  const [results] = await connection.execute(sql, params);
  return results;
};
