const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user.model");

const proyect = sequelize.define('proyectos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fecha_creacion: {
        type: DataTypes.DATETIME,
        allowNull: false,
    },
    administrador_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'usuarios', key: 'id' },
    },
},{
    timestamps: false,
    tableName: 'proyectos',
});

module.exports = proyect;