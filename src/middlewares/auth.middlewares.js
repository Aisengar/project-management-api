const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

const authMiddleware = (req, res , next) => {
    const token = req.headers('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido' });
        }
        req.user = user;
        next();
    });
};

const checkRole = (roles) => {
    return (req, res, next) => {
        const  { rol_id } = req.user;
        if (!roles.includes(rol_id)) {
            return res.status(403).json({ message: 'No tienes permisos para acceder a esta ruta' });
        }
        next();
    };
};

module.exports = { authMiddleware, checkRole };