const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class Post extends Model {}

Post.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { len: [1] }, //ensure there is at least one character inside the comment body
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id:{
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "user",
            key: "id",
          },
      },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: "post",
      }
    )

    module.exports = Post;