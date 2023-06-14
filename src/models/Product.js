module.exports = (sequelize, DataType) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataType.STRING(100),
    price: DataType.DECIMAL(10, 2),
    discount: DataType.INTEGER,
    description: DataType.STRING(1000),
    image: DataType.STRING(100),
    id_product_type: DataType.INTEGER,
    cor_01: DataType.STRING(100),
    cor_02: DataType.STRING(100),
    cor_03: DataType.STRING(100),
    cor_04: DataType.STRING(100),
    cor_05: DataType.STRING(100),
    cor_06: DataType.STRING(100),
    arm_01: DataType.INTEGER,
    arm_02: DataType.INTEGER,
    arm_03: DataType.INTEGER,
    arm_04: DataType.INTEGER,
    arm_05: DataType.INTEGER,
    arm_06: DataType.INTEGER
  }, {
    tableName: 'product',
    timestamps: false
  })
  Product.associate = (modelsList) => {
    Product.belongsTo(modelsList.ProductType, {
      foreignKey: 'id_product_type',
      as: 'productType'
    })
    Product.belongsToMany(modelsList.Order, {
      foreignKey: 'id_order',
      as: 'order',
      through: modelsList.OrderItem
    })
  }
  return Product
}