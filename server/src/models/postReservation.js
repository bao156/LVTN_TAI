"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class PostReservation extends Model {
    static associate(models) {
      PostReservation.belongsTo(models.User, { foreignKey: "userId", targetKey: "id", as: "user" });
      PostReservation.belongsTo(models.Post, { foreignKey: "postId", targetKey: "id", as: "post" });
    }
  }

  PostReservation.init(
    {
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      postId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "Posts",
          key: "id",
        },
      },
      isApproved: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "PostReservation",
    }
  );

  return PostReservation;
};
