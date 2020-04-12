module.exports = function(sequelize, DataTypes) {
  var Order = sequelize.define(
    "Order",
    {
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      product_name: {
        type: DataTypes.STRING,
        allowNull: false,
        len: [1]
      },
      product_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      order_status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0
      },
      order_approved: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0
      }
    },
    {
      freezeTableName: true
    }
  );

  return Order;
};
