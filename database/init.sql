CREATE TABLE Usuario (
    id SERIAL PRIMARY KEY,
    identificacion VARCHAR(10) UNIQUE,
    nombre VARCHAR(100),
    correo VARCHAR(100) UNIQUE,
    contrasena VARCHAR(255),
    rol VARCHAR(20) 
);

CREATE TABLE RepositorioChatbot (
    idConsulta SERIAL PRIMARY KEY,
    cedula_cliente VARCHAR(10) REFERENCES Usuario(cedula),
    preguntaUsuarios TEXT,
    respuestaIA TEXT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Cita (
    idCita SERIAL PRIMARY KEY,
    cedula_cliente VARCHAR(10) REFERENCES Usuario(cedula),
    fechaHora TIMESTAMP,
    motivo TEXT,
    estado VARCHAR(20) DEFAULT 'Pendiente' 
);