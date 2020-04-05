module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define(
    "Post",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1],
        },
      },
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
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        len: [1],
      },
    },
    {
      freezeTableName: true,
    }
  );

  return Post;
};
