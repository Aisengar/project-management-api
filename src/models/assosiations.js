const User = require('./user.model');
const Proyect = require('./proyect.model');
const UserProyect = require('./userProyect.model');

// Relación entre User y Proyect a través de UserProyect
User.belongsToMany(Proyect, { through: UserProyect, foreignKey: 'user_id' });
Proyect.belongsToMany(User, { through: UserProyect, foreignKey: 'proyect_id' });

// Relación entre User y User (autorreferencia)
User.hasMany(User, { as: 'subordinates', foreignKey: 'administrador_id' });
User.belongsTo(User, { as: 'administrator', foreignKey: 'administrador_id' });

Proyect.belongsTo(User, { as: 'administrator', foreignKey: 'administrador_id' });

module.exports = {
    User,
    Proyect,
    UserProyect,
};