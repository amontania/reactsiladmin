import { query } from "../database/database.js";
import { helper } from "../_util/helper.js";
import config from "../config/db.js";

const getCombo = async (req, res) => {
  try {
    const { pOperation, pId } = req.body;
    console.log("body" + req.body);
    const rows = await query("call spCombos(?,?)", [pOperation, pId]);
    const data = helper.emptyOrRows(rows);
    res.json({ data });
  } catch (err) {
    res.status(600);
    res.send(err.message);
  }
};

export const utilController = {
  getCombo,
};
