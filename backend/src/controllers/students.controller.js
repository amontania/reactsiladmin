import { query } from "./../database/database.js";
import { helper } from "../_util/helper.js";
import config from "./../config/db.js";

const getStudents = async (req, res) => {
  try {
    const { page } = req.query || 1;
    const { year } = req.body;
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await query("call spAlumnos(?,?,?,?,?)", [
      1,
      year,
      0,
      offset,
      config.listPerPage,
    ]);
    const data = helper.emptyOrRows(rows);
    res.json({ data, page });
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

const getStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { year } = req.body;
    const [rows, fields] = await query("call spAlumnos(?,?,?,?,?)", [
      2,
      year,
      id,
      0,
      1,
    ]);
    const data = helper.emptyOrRows(rows);
    res.json(data);
    console.log(fields);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

const addStudent = async (req, res) => {
  try {
    const { codigo, descripcion } = req.body;
    if (codigo === undefined || descripcion == undefined) {
      res.status(400).json({ message: "Bad request:Please fill all field." });
    }
    const student = { codigo, descripcion };
    const results = await query("call spBancos(?,?)", [codigo, descripcion]);
    if (results.affectedRows) res.json({ message: "Added" });
    else {
      res.json({ message: "No" });
    }
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

export const studentController = {
  getStudents,
  getStudent,
  addStudent,
};
