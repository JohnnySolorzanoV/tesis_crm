const Cita = require('../entities/Cita');
const { citaRepository } = require('../repositories/citaRepositorio');

async function AgendarCita({ fecha, hora, paciente_cedula, doctor_cedula }) {
  // Validar que todos los parámetros requeridos estén presentes
  if (!fecha || !hora || !paciente_cedula || !doctor_cedula) {
    throw new Error('Todos los campos son requeridos: fecha, hora, paciente_cedula, doctor_cedula');
  }

  // Crear nueva instancia de Cita
  const nuevaCita = new Cita({
    fecha,
    hora,
    paciente_cedula,
    doctor_cedula,
  });

  console.log('Agendando cita:', nuevaCita);

  // Guardar la cita en la base de datos
  return citaRepository.create(nuevaCita);
}

module.exports = AgendarCita;
