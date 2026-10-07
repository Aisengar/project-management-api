const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const RolPermission = sequelize.define('rol_permissions', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},{
    timestamps: false,
    tableName: 'rol_permissions',
});

module.exports = RolPermission;