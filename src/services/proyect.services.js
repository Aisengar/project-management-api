const Proyect = require('../models/proyect.model');
const User = require('../models/user.model');

exports.createProyect = async (nombre, descripcion, administrador_id) => {
    try {
        const proyect = await Proyect.create({ nombre, descripcion, administrador_id });
        return proyect;
    } catch (error) {
        throw new Error(`Error al crear el proyecto: ${error.message}`);
    }
};

exports.getAllProyects = async (administrador_id) => {
    try {
        const proyects = await Proyect.findAll({
            where: { administrador_id },
            include: [{ model: User, as: 'administrator', attributes: ['id', 'nombre', 'email'] }]
        });
        return proyects;
    } catch (error) {
        throw new Error(`Error al obtener los proyectos: ${error.message}`);
    }
};

exports.getProyectById = async (id) => {
    try {
        const proyect = await Proyect.findByPk(id, {
            include: [
                { model: User, as: 'administrator', attributes: ['id', 'nombre', 'email'] },
                { model: User, through: { attributes: [] }, attributes: ['id', 'nombre', 'email'] }
            ]
        });
        if (!proyect) {
            throw new Error('Proyecto no encontrado');
        }
        return proyect;
    } catch (error) {
        throw new Error(`Error al obtener el proyecto: ${error.message}`);
    }
};

exports.updateProyect = async (id, nombre, descripcion, administrador_id) => {
    try {
        const proyect = await Proyect.findByPk(id);
        if (!proyect) {
            throw new Error('Proyecto no encontrado');
        }
        if (proyect.administrador_id !== administrador_id) {
            throw new Error('No tienes permisos para actualizar este proyecto');
        }
        await proyect.update({ nombre, descripcion });
        return proyect;
    } catch (error) {
        throw new Error(`Error al actualizar el proyecto: ${error.message}`);
    }
};

exports.deleteProyect = async (id, administrador_id) => {
    try {
        const proyect = await Proyect.findByPk(id);
        if (!proyect) {
            throw new Error('Proyecto no encontrado');
        }
        if (proyect.administrador_id !== administrador_id) {
            throw new Error('No tienes permisos para eliminar este proyecto');
        }
        await proyect.destroy();
        return { message: 'Proyecto eliminado correctamente' };
    } catch (error) {
        throw new Error(`Error al eliminar el proyecto: ${error.message}`);
    }
};
