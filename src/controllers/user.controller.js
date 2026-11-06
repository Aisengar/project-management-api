const userService = require('../services/user.services');

exports.createUser = async (req, res, next) => {
    try {
        const { nombre, email, password, rol_id } = req.body;
        const administrador_id = req.user.id;
        const user = await userService.createUser(nombre, email, password, rol_id, administrador_id);
        res.status(201).json({ message: 'Usuario creado exitosamente', user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { nombre, email, password, rol_id } = req.body;
        const admin_from_token = req.user.id;
        const updatedUser = await userService.updateUser(id, nombre, email, password, rol_id, null, admin_from_token);
        res.json({ message: 'Usuario actualizado exitosamente', user: updatedUser });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllUsersByAdministradorId = async (req, res, next) => {
    try {
        const administrador_id = req.user.id;
        const { email } = req.query;
        const users = await userService.getAllUsersByAdministradorId(administrador_id, email);
        res.json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const admin_from_token = req.user.id;
        const result = await userService.deleteUser(id, admin_from_token);
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const users = await userService.getAllUsersByRolId(id);
        res.json(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
