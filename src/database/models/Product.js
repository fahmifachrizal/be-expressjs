module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      sku: {
        type: DataTypes.STRING,
        unique: true,
      },
      name: DataTypes.STRING,
      price: DataTypes.DECIMAL,
      unit: DataTypes.STRING,
    },
    {
      tableName: "products",
      underscored: true,
      timestamps: true,
    }
  )
}