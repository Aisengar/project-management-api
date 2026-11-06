const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('../models/user.model');
const RolePermission = require('../models/rolPermission.model');

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

exports.loginUser = async (email, password) => {
        //verificar si el usuario existe
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        //verificar la contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Contraseña incorrecta');
        }
        return jwt.sign(
            { id: user.id, nombre: user.nombre, email: user.email, rol_id: user.rol_id },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

};