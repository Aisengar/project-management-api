const express = require('express');
const sequelize = require('./config/db');
const { PORT } = require('./config/dotenv');

require('./models/assosiations'); // registra modelos y relaciones

const authRoutes = require('./routes/auth.routes');
const usersRoutes = require('./routes/users.routes');
const proyectRoutes = require('./routes/proyect.routes');

const app = express();

app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', usersRoutes);
app.use('/api', proyectRoutes);

const start = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos OK');
        app.listen(PORT || 3000, () => {
            console.log(`Servidor escuchando en el puerto ${PORT || 3000}`);
        });
    } catch (error) {
        console.error('No se pudo iniciar:', error.message);
        process.exit(1);
    }
};

start();