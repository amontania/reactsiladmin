import { Sequelize, DataTypes } from "sequelize";
import bcrypt from "bcryptjs";

const user = Sequelize.define("user", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isAdmin: {
    type: DataTypes.Boolean,
    allowNull: false,
    defaultValue: false,
  },
  pic: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  },
});
export default user;
