const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { PORT } = require('./config/dotenv');
const sequelize = require('./config/db');
require('./models/assosiations');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/users.routes');
const proyectRoutes = require('./routes/proyect.routes');
const errorHandler = require('./middlewares/error.middlewares');

const app = express();
app.use(express.json());

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', proyectRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'API funcionando correctamente' });
});

app.use(errorHandler);

const port = PORT || 3000;

sequelize.authenticate()
    .then(() => {
        console.log('Base de datos conectada exitosamente.');
        return sequelize.sync({ alter: false });
    })
    .then(() => {
        app.listen(port, () => {
            console.log(`Servidor corriendo en el puerto ${port}`);
        });
    })
    .catch((err) => {
        console.error('No se pudo conectar a la base de datos:', err);
    });

module.exports = app;
