class Chatbot {
  constructor({ idConsulta, cedula_cliente, preguntaUsuarios, respuestaIA, fecha }) {
    this.idConsulta = idConsulta;
    this.cedula_cliente = cedula_cliente;
    this.preguntaUsuarios = preguntaUsuarios;
    this.respuestaIA = respuestaIA;
    this.fecha = fecha;
  }
}

module.exports = Chatbot;