import * as bcrypt from "bcrypt";
const getOffset = (currentPage = 1, listPerPage) => {
  return (currentPage - 1) * [listPerPage];
};

const emptyOrRows = (rows) => {
  if (!rows) {
    return [];
  }
  return rows;
};

const cryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashpassword = await bcrypt.hash(password, salt);
  return hashpassword;
};

const comparePassword = (password, hashPassword) => {
  return bcrypt.compare(password, hashPassword);
};

export const helper = {
  getOffset,
  emptyOrRows,
  cryptPassword,
  comparePassword,
};
