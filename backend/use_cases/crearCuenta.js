const Usuario = require('../entities/Usuario');
const { UsuarioRepository } = require('../repositories/UsuarioRepository');


async function CrearCuenta({ cedula, nombre, correo, contrasena, rol }) {
  const usuario = new Usuario({ cedula, nombre, correo, contrasena, rol });
  console.log('Creando cuenta para usuario:', usuario);
  return UsuarioRepository.create(usuario);
}

module.exports = CrearCuenta;
