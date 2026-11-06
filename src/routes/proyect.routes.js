const express = require('express');
const router = express.Router();
const proyectController = require('../controllers/proyect.controller');
const { authMiddleware, checkRole } = require('../middlewares/auth.middlewares');
const ROLES = require('../utils/constants');
const errorHandler = require('../middlewares/error.middlewares');

// Rutas de proyectos
router.post('/proyectos', authMiddleware, checkRole([ROLES.ADMIN]), proyectController.createProyect);
router.get('/proyectos', authMiddleware, proyectController.getAllProyects);
router.get('/proyectos/:id', authMiddleware, proyectController.getProyectById);
router.put('/proyectos/:id', authMiddleware, checkRole([ROLES.ADMIN]), proyectController.updateProyect);
router.delete('/proyectos/:id', authMiddleware, checkRole([ROLES.ADMIN]), proyectController.deleteProyect);

router.use(errorHandler);

module.exports = router;
