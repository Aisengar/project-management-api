const authService = require('../services/auth.services');

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email y contraseña son requeridos' });
        }
        const token = await authService.loginUser(email, password);
        res.json({ token });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};
