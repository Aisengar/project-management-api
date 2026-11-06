const proyectService = require('../services/proyect.services');

exports.createProyect = async (req, res, next) => {
    try {
        const { nombre, descripcion } = req.body;
        const administrador_id = req.user.id;
        const proyect = await proyectService.createProyect(nombre, descripcion, administrador_id);
        res.status(201).json({ message: 'Proyecto creado exitosamente', proyect });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllProyects = async (req, res, next) => {
    try {
        const administrador_id = req.user.id;
        const proyects = await proyectService.getAllProyects(administrador_id);
        res.json(proyects);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getProyectById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const proyect = await proyectService.getProyectById(id);
        res.json(proyect);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.updateProyect = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion } = req.body;
        const administrador_id = req.user.id;
        const proyect = await proyectService.updateProyect(id, nombre, descripcion, administrador_id);
        res.json({ message: 'Proyecto actualizado exitosamente', proyect });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteProyect = async (req, res, next) => {
    try {
        const { id } = req.params;
        const administrador_id = req.user.id;
        const result = await proyectService.deleteProyect(id, administrador_id);
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.assignUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { usuario_id } = req.body;
        const administrador_id = req.user.id;
        await proyectService.assignUser(id, usuario_id, administrador_id);
        res.status(201).json({ message: 'Usuario asignado al proyecto exitosamente' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.removeUser = async (req, res, next) => {
    try {
        const { id, usuarioId } = req.params;
        const administrador_id = req.user.id;
        const result = await proyectService.removeUser(id, usuarioId, administrador_id);
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
