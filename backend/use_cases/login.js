const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UsuarioRepository } = require('../repositories/UsuarioRepository');

async function Login({ correo, contrasena }) {
  const usuario = await UsuarioRepository.findByCorreo(correo);
  if (!usuario) {
    throw new Error('Usuario no encontrado');
  }
  const contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena);
  if (!contrasenaValida) {
    throw new Error('Contraseña incorrecta');
  }
  const token = jwt.sign({ cedula: usuario.cedula, rol: usuario.rol }, 'secreto', { expiresIn: '1h' });
  usuario.token = token;
  return usuario;
}

module.exports = Login;