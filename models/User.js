const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");
const bcrypt = require("bcrypt");

class User extends Model {
  checkPassword(usersPassword){
    return bcrypt.compareSync(usersPassword, this.password)
  }
}


User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {len: [5]},
    }
  },
  {
    hooks: {
      beforeCreate: async(newUser) => {
        newUser.password = await bcrypt.hash(newUser.password, 10)
      }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;
