const User = require('../models/user.model');
const bycrypt = require('bcryptjs');

exports.createUser = async (nombre, email, password, rol_id, administrador_id) => {
    try{
        const userExist = await User.findOne({ where: { email } });
        if(userExist){
            throw new Error('El usuario ya existe');
        }
        const hashedPassword = await bycrypt.hash(password, 10);
        const user = await User.create({ nombre, email, password: hashedPassword, rol_id, administrador_id });
        return user;
    }
    catch(error){
        throw new Error(`Error al crear el Usuario: ${error.message}`);
    }
}

exports.updateUser = async (id, nombre, email, password, rol_id, administrador_id, admin_from_token) => {
    try{
        const userUpdate = await User.findByPk(id);
        if(!userUpdate){
            throw new Error('El usuario no existe')
        }
        if(userUpdate.administrador_id !== admin_from_token){
            throw new Error('No tienes permisos para actualizar este usuario')
        }
        if(email && email !== userUpdate.email){
            const userExist = await User.findOne({ where: { email } });
            if(userExist){
                throw new Error('El email ya esta en uso');
            }
        }
        const updates = {nombre, email, rol_id};
        if(password){
            const hashedPassword = await bycrypt.hash(password, 10);
            updates.password = hashedPassword;
        }

        await userUpdate.update(updates);
        return userUpdate;
    }
    catch(error){
        throw new Error(`Error al actualizar el Usuario: ${error.message}`);
    }
}

exports.getAllUsersByAdministradorId = async (administrador_id, email) => {
    try {
        const whereClause = { administrador_id };
        if(email){
            whereClause.email = email
        }
        const users = await User.findAll({ where: whereClause, attributes: { exclude: ['password'] } });
        if(users.length === 0){
            throw new Error(`No se encontraron usuarios para el administrador con ID: ${administrador_id}`);
        }
        return users;
    } catch (error) {
        throw new Error(`Se genero un problema la intentar cargar los usuarios con el ${administrador_id}: ${error.message}`)
    }
}

exports.deleteUser = async (id, admin_from_token) => {
    try {
        const userToDelete = await User.findByPk(id)
        if(!userToDelete){
            throw new Error(`El usuario con ID: ${id} no existe`)
        }
        if(userToDelete.administrador_id !== admin_from_token){
            throw new Error('No tienes permisos para actualizar este usuario')
        }
        await userToDelete.destroy()
        return { message: `Usuario con ID: ${id} eliminado correctamente` }

    } catch (error) {
        throw new Error(`No se pudo eliminar el usuario con ID: ${id}. ${error.message}`)
    }
}

exports.getAllUsersByRolId = async (rol_id) => {
    try {
        return await User.findAll({where: {rol_id}, attributes: {exclude: ['password']}})
    } catch (error) {
        throw new Error(`Se genero un problema la intentar cargar los usuarios con el ${rol_id}: ${error.message}`)
    }
}