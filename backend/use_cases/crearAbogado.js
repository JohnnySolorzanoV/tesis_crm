const AbogadoRepositorio = require('../repositories/abogado_repositorio');

async function CrearAbogado({ identificacion, nombre, correo, contrasena, especialidad, num_licencia }) {
    return await AbogadoRepositorio.create({
        identificacion,
        nombre,
        correo,
        contrasena,
        especialidad,
        num_licencia,
    });
}

module.exports = CrearAbogado;