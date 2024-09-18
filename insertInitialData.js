import Rol from './models/mantenimiento/RolMoldel.js';
import Usuario from './models/principal/UsuarioModel.js';
import argon2 from 'argon2';

async function insertInitialData() {
    try {
        
        await Rol.findOrCreate({
            where: { NOMBRE_ROL: 'admin' },
            defaults: { NOMBRE_ROL: 'admin' }
        });

        await Rol.findOrCreate({
            where: { NOMBRE_ROL: 'psicologo' },
            defaults: { NOMBRE_ROL: 'psicologo' }
        });

        await Rol.findOrCreate({
            where: { NOMBRE_ROL: 'docente' },
            defaults: { NOMBRE_ROL: 'docente' }
        });

        const existeAdminUser = await Usuario.findOne({
            where: { ID_USUARIO: 1 }
        });

        if (!existeAdminUser) {
            const hashedPassword = await argon2.hash('adminpassword');
            await Usuario.create({
                DNI_USUARIO: '12345678',
                NOMBRE_USUARIO: 'Admin',
                APELLIDO_USUARIO: 'User',
                USERNAME: 'admin',
                EMAIL: 'admin@gmail.com',
                PASSWORD_USER: hashedPassword,
                ID_ROL: 1 
            });

            console.log('Usuario admin creado');
        } else {
            console.log('Usuario admin ya existe con ID_USUARIO = 1');
        }
    } catch (error) {
        console.error('Error insertando datos iniciales:', error);
    }
}

export default insertInitialData;
