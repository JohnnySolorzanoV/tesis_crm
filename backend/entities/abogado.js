const Usuario = require("./Usuario");

class Abogado extends Usuario {
    constructor({ id, identificacion, nombre, correo, contrasena, especialidad, num_licencia }) {
        super({ id, identificacion, nombre, correo, contrasena, rol: 'abogado' });
        this.especialidad = especialidad;
        this.num_licencia = num_licencia;
    }
}