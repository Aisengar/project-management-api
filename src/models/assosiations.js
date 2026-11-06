
const Rol = require('./rolPermission.model');
const User = require('./user.model');
const Proyect = require('./proyect.model');
const UserProyect = require('./userProyect.model');
 
// N Usuarios ("clasifica")
Rol.hasMany(User, { foreignKey: 'rol_id' });
User.belongsTo(Rol, { foreignKey: 'rol_id' });
 
//N Usuarios subordinados (autorreferencia)
User.hasMany(User, { as: 'subordinates', foreignKey: 'administrador_id' });
User.belongsTo(User, { as: 'administrator', foreignKey: 'administrador_id' });
 
// N Proyectos ("administra")
User.hasMany(Proyect, { as: 'proyectosAdministrados', foreignKey: 'administrador_id' });
Proyect.belongsTo(User, { as: 'administrator', foreignKey: 'administrador_id' });
 
// Usuarios N --- N Proyectos a través de usuarios_proyectos ("participa" / "incluye")
User.belongsToMany(Proyect, {
    through: UserProyect,
    foreignKey: 'usuario_id',
    otherKey: 'proyecto_id',
});
Proyect.belongsToMany(User, {
    through: UserProyect,
    foreignKey: 'proyecto_id',
    otherKey: 'usuario_id',
});
 
module.exports = {
    Rol,
    User,
    Proyect,
    UserProyect,
};