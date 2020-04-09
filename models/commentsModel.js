module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define(
    "Comment",
    {
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1],
      },
      user: {
        type: DataTypes.STRING,
        allowNull: false,
        len: [1],
      },
    },
    {
      freezeTableName: true,
    }
  );

  Comment.associate = function(models) {
    // associations can be defined here
    Comment.belongsTo(models.Post, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Comment;
};
