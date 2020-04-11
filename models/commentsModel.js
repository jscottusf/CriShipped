module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define(
    "Comment",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
      },
      commenter: {
        type: DataTypes.STRING,
        allowNull: false,
        len: [1]
      },
      poster: {
        type: DataTypes.STRING,
        allowNull: false,
        len: [1]
      },
      seen: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0
      }
    },
    {
      freezeTableName: true
    }
  );

  Comment.associate = function(models) {
    // associations can be defined here
    Comment.belongsTo(models.Post, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Comment;
};
