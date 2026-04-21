const bcrypt = require('bcrypt');
const { UsuarioRepository } = require('../repositories/UsuarioRepository');

async function Login({ correo, contrasena }) {
  const usuario = await UsuarioRepository.findByCorreo(correo);
  if (!usuario) {
    throw new Error('Usuario no encontrado');
  }
  const isPasswordValid = await bcrypt.compare(contrasena, usuario.contrasena);
  if (!isPasswordValid) {
    throw new Error('Contraseña incorrecta');
  }
  return usuario;
}

module.exports = Login;