import Rol from './RolModel.js';
import Usuario from './UsuarioModel.js';
import argon2 from 'argon2';

async function insertInitialData() {
    try {
        // Creando roles por defecto
        await Rol.findOrCreate({
            where: { NOMBRE_ROL: 'admin' },
            defaults: { NOMBRE_ROL: 'admin' }
        });

        await Rol.findOrCreate({
            where: { NOMBRE_ROL: 'tutor' },
            defaults: { NOMBRE_ROL: 'tutor' }
        });

        

        //Creando un usuario admin por defecto, evitar volver a crearlo si ya existe
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
                EMAIL: 'admin@example.com',
                USER_PASSWORD: hashedPassword,
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
