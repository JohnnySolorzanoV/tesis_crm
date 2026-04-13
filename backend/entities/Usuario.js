class Usuario {
  constructor({ cedula, nombre, correo, contrasena, rol }) {
    this.cedula = cedula;
    this.nombre = nombre;
    this.correo = correo;
    this.contrasena = contrasena;
    this.rol = rol;
  }
}

module.exports = Usuario;
