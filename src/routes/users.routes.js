const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authMiddleware, checkRole } = require('../middlewares/auth.middlewares');
const ROLES = require('../utils/constants');
const errorHandler = require('../middlewares/error.middlewares');

// Ruta para crear un usuario
router.post('/users/create', authMiddleware, checkRole([ROLES.ADMIN]), userController.createUser);

// Ruta para actualizar un usuario
router.put('/users/update/:id', authMiddleware, checkRole([ROLES.ADMIN]), userController.updateUser);

// Ruta para obtener todos los usuarios de un administrador
router.get('/users', authMiddleware, checkRole([ROLES.ADMIN]), userController.getAllUsersByAdministradorId);

// Ruta para borar un usuario
router.delete('/users/delete/:id', authMiddleware, checkRole([ROLES.ADMIN]), userController.deleteUser);

//Ruta para obtener un usuario por su ID
router.get('/users/rol/:id', authMiddleware, checkRole([ROLES.ADMIN]), userController.getUserById);

// Manejo de errores
router.use(errorHandler);

module.exports = router;