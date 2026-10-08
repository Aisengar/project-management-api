const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Proyect = sequelize.define('proyectos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    fecha_creacion: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    administrador_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'usuarios', key: 'id' },
    },
}, {
    timestamps: false,
    tableName: 'proyectos',
});

module.exports = Proyect;