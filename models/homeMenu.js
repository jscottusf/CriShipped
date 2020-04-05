module.exports = function(sequelize, DataTypes) {
  var Home = sequelize.define(
    "Home",
    {
      card_title: DataTypes.STRING,
      url: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
  return Home;
};
